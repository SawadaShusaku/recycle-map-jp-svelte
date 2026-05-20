import { describe, expect, it, vi } from 'vitest';
import { handleContactSubmission } from '../contact';

const baseEnv = {
	TURNSTILE_SECRET_KEY: 'turnstile-secret',
	RESEND_API_KEY: 'resend-secret',
	CONTACT_FROM_EMAIL: 'Recycle Map <contact@example.com>',
	CONTACT_TO_EMAIL: 'owner@example.com'
};

function makeRequest(fields: Record<string, string>): Request {
	const formData = new FormData();
	for (const [key, value] of Object.entries(fields)) {
		formData.set(key, value);
	}
	return new Request('https://example.test/api/contact', {
		method: 'POST',
		body: formData
	});
}

function validFields(overrides: Record<string, string> = {}): Record<string, string> {
	return {
		name: '山田太郎',
		email: 'user@example.com',
		message: '掲載情報の修正について確認したいです。',
		'cf-turnstile-response': 'turnstile-token',
		...overrides
	};
}

async function readJson(response: Response) {
	return await response.json() as {
		success: boolean;
		error?: string;
		fieldErrors?: Record<string, string>;
	};
}

function makeFetcher(options: { turnstileSuccess?: boolean; resendOk?: boolean } = {}) {
	const turnstileSuccess = options.turnstileSuccess ?? true;
	const resendOk = options.resendOk ?? true;

	return vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
		const url = String(input);

		if (url.includes('siteverify')) {
			const body = init?.body as URLSearchParams;
			expect(body.get('secret')).toBe(baseEnv.TURNSTILE_SECRET_KEY);
			expect(body.get('response')).toBe('turnstile-token');
			return new Response(JSON.stringify({ success: turnstileSuccess }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		if (url.includes('api.resend.com')) {
			return new Response(JSON.stringify({ id: 'email-id' }), {
				status: resendOk ? 200 : 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		throw new Error(`Unexpected fetch ${url}`);
	});
}

describe('handleContactSubmission', () => {
	it('rejects missing required fields before external calls', async () => {
		const fetcher = makeFetcher();
		const response = await handleContactSubmission({
			request: makeRequest({}),
			env: baseEnv,
			fetcher
		});
		const body = await readJson(response);

		expect(response.status).toBe(400);
		expect(body.error).toBe('validation');
		expect(body.fieldErrors).toMatchObject({
			name: expect.any(String),
			email: expect.any(String),
			message: expect.any(String),
			turnstile: expect.any(String)
		});
		expect(fetcher).not.toHaveBeenCalled();
	});

	it('rejects invalid email addresses before external calls', async () => {
		const fetcher = makeFetcher();
		const response = await handleContactSubmission({
			request: makeRequest(validFields({ email: 'not-an-email' })),
			env: baseEnv,
			fetcher
		});
		const body = await readJson(response);

		expect(response.status).toBe(400);
		expect(body.error).toBe('validation');
		expect(body.fieldErrors?.email).toBeTruthy();
		expect(fetcher).not.toHaveBeenCalled();
	});

	it('rejects oversized submissions before parsing form data', async () => {
		const fetcher = makeFetcher();
		const response = await handleContactSubmission({
			request: new Request('https://example.test/api/contact', {
				method: 'POST',
				headers: { 'content-length': '20001' },
				body: ''
			}),
			env: baseEnv,
			fetcher
		});
		const body = await readJson(response);

		expect(response.status).toBe(413);
		expect(body.error).toBe('validation');
		expect(fetcher).not.toHaveBeenCalled();
	});

	it('removes line breaks from the email subject name', async () => {
		const fetcher = makeFetcher();
		const response = await handleContactSubmission({
			request: makeRequest(validFields({ name: '山田\r\nBcc: attacker@example.com' })),
			env: baseEnv,
			fetcher
		});
		const resendCall = fetcher.mock.calls.find(([input]) => String(input).includes('api.resend.com'));
		const resendBody = JSON.parse(String(resendCall?.[1]?.body));

		expect(response.status).toBe(200);
		expect(resendBody.subject).toBe('[全国リサイクルマップ] お問い合わせ: 山田 Bcc: attacker@example.com');
	});

	it('returns a server configuration error when the Turnstile secret is missing', async () => {
		const fetcher = makeFetcher();
		const response = await handleContactSubmission({
			request: makeRequest(validFields()),
			env: { ...baseEnv, TURNSTILE_SECRET_KEY: undefined },
			fetcher
		});
		const body = await readJson(response);

		expect(response.status).toBe(500);
		expect(body.error).toBe('server_config');
		expect(fetcher).not.toHaveBeenCalled();
	});

	it('rejects failed Turnstile verification without calling Resend', async () => {
		const fetcher = makeFetcher({ turnstileSuccess: false });
		const response = await handleContactSubmission({
			request: makeRequest(validFields()),
			env: baseEnv,
			fetcher,
			remoteIp: '203.0.113.10'
		});
		const body = await readJson(response);

		expect(response.status).toBe(403);
		expect(body.error).toBe('turnstile_failed');
		expect(fetcher).toHaveBeenCalledTimes(1);
	});

	it('returns a server configuration error when Resend settings are missing', async () => {
		const fetcher = makeFetcher();
		const response = await handleContactSubmission({
			request: makeRequest(validFields()),
			env: { ...baseEnv, RESEND_API_KEY: undefined },
			fetcher
		});
		const body = await readJson(response);

		expect(response.status).toBe(500);
		expect(body.error).toBe('server_config');
		expect(fetcher).toHaveBeenCalledTimes(1);
	});

	it('returns send failure when Resend rejects delivery', async () => {
		const fetcher = makeFetcher({ resendOk: false });
		const response = await handleContactSubmission({
			request: makeRequest(validFields()),
			env: baseEnv,
			fetcher
		});
		const body = await readJson(response);

		expect(response.status).toBe(502);
		expect(body.error).toBe('send_failed');
		expect(fetcher).toHaveBeenCalledTimes(2);
	});

	it('sends verified submissions through Resend', async () => {
		const fetcher = makeFetcher();
		const response = await handleContactSubmission({
			request: makeRequest(validFields()),
			env: baseEnv,
			fetcher,
			now: new Date('2026-05-19T00:00:00.000Z')
		});
		const body = await readJson(response);
		const resendCall = fetcher.mock.calls.find(([input]) => String(input).includes('api.resend.com'));
		const resendBody = JSON.parse(String(resendCall?.[1]?.body));

		expect(response.status).toBe(200);
		expect(body.success).toBe(true);
		expect(resendBody).toMatchObject({
			from: baseEnv.CONTACT_FROM_EMAIL,
			to: [baseEnv.CONTACT_TO_EMAIL],
			reply_to: 'user@example.com',
			subject: '[全国リサイクルマップ] お問い合わせ: 山田太郎'
		});
		expect(resendBody.text).toContain('■ お問い合わせ内容');
		expect(resendBody.text).toContain('掲載情報の修正について確認したいです。');
		expect(resendBody.text).not.toContain('turnstile-token');
	});
});
