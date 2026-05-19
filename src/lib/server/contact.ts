import {
	CONTACT_EMAIL_MAX_LENGTH,
	CONTACT_MESSAGE_MAX_LENGTH,
	CONTACT_NAME_MAX_LENGTH
} from '$lib/contact';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_EMAILS_URL = 'https://api.resend.com/emails';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactRuntimeEnv = {
	TURNSTILE_SECRET_KEY?: string;
	RESEND_API_KEY?: string;
	CONTACT_FROM_EMAIL?: string;
	CONTACT_TO_EMAIL?: string;
};

type ContactFieldErrors = Partial<Record<'name' | 'email' | 'message' | 'turnstile', string>>;

type ContactErrorCode =
	| 'validation'
	| 'server_config'
	| 'turnstile_failed'
	| 'turnstile_unavailable'
	| 'send_failed';

type ContactSuccess = {
	success: true;
};

type ContactFailure = {
	success: false;
	error: ContactErrorCode;
	message: string;
	fieldErrors?: ContactFieldErrors;
};

type TurnstileOutcome = {
	success?: boolean;
	'error-codes'?: string[];
};

type ContactSubmission = {
	name: string;
	email: string;
	message: string;
	turnstileToken: string;
};

export type ContactResponse = ContactSuccess | ContactFailure;

type HandleContactOptions = {
	request: Request;
	env: ContactRuntimeEnv;
	fetcher?: typeof fetch;
	remoteIp?: string | null;
	now?: Date;
};

function jsonResponse(body: ContactResponse, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' }
	});
}

function readText(formData: FormData, name: string): string {
	const value = formData.get(name);
	return typeof value === 'string' ? value.trim() : '';
}

async function readSubmission(request: Request): Promise<{
	submission?: ContactSubmission;
	fieldErrors: ContactFieldErrors;
}> {
	const formData = await request.formData();
	const name = readText(formData, 'name');
	const email = readText(formData, 'email');
	const message = readText(formData, 'message');
	const turnstileToken = readText(formData, 'cf-turnstile-response');
	const fieldErrors: ContactFieldErrors = {};

	if (!name) {
		fieldErrors.name = 'お名前を入力してください。';
	} else if (name.length > CONTACT_NAME_MAX_LENGTH) {
		fieldErrors.name = `${CONTACT_NAME_MAX_LENGTH}文字以内で入力してください。`;
	}

	if (!email) {
		fieldErrors.email = 'メールアドレスを入力してください。';
	} else if (email.length > CONTACT_EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) {
		fieldErrors.email = '有効なメールアドレスを入力してください。';
	}

	if (!message) {
		fieldErrors.message = 'お問い合わせ内容を入力してください。';
	} else if (message.length > CONTACT_MESSAGE_MAX_LENGTH) {
		fieldErrors.message = `${CONTACT_MESSAGE_MAX_LENGTH}文字以内で入力してください。`;
	}

	if (!turnstileToken) {
		fieldErrors.turnstile = '認証を完了してください。';
	}

	if (Object.keys(fieldErrors).length > 0) {
		return { fieldErrors };
	}

	return {
		submission: { name, email, message, turnstileToken },
		fieldErrors
	};
}

async function verifyTurnstile(
	submission: ContactSubmission,
	env: ContactRuntimeEnv,
	fetcher: typeof fetch,
	remoteIp?: string | null
): Promise<'ok' | 'failed' | 'unavailable'> {
	const body = new URLSearchParams({
		secret: env.TURNSTILE_SECRET_KEY ?? '',
		response: submission.turnstileToken
	});

	if (remoteIp) {
		body.set('remoteip', remoteIp);
	}

	const response = await fetcher(TURNSTILE_VERIFY_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body
	});

	if (!response.ok) {
		const responseText = await response.text().catch(() => '');
		console.warn(
			'[contact] Turnstile verification request failed',
			response.status,
			responseText.slice(0, 300)
		);
		return 'unavailable';
	}

	const outcome = (await response.json()) as TurnstileOutcome;
	return outcome.success ? 'ok' : 'failed';
}

async function sendContactEmail(
	submission: ContactSubmission,
	env: ContactRuntimeEnv,
	fetcher: typeof fetch,
	now: Date
): Promise<boolean> {
	const response = await fetcher(RESEND_EMAILS_URL, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${env.RESEND_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: env.CONTACT_FROM_EMAIL,
			to: [env.CONTACT_TO_EMAIL],
			reply_to: submission.email,
			subject: `お問い合わせ: ${submission.name}`,
			text: [
				'全国リサイクルマップのお問い合わせフォームから送信されました。',
				'',
				`送信日時: ${now.toISOString()}`,
				`お名前: ${submission.name}`,
				`メールアドレス: ${submission.email}`,
				'',
				'お問い合わせ内容:',
				submission.message
			].join('\n')
		})
	});

	if (!response.ok) {
		console.warn('[contact] Resend delivery failed', response.status);
		return false;
	}

	return true;
}

export async function handleContactSubmission({
	request,
	env,
	fetcher = fetch,
	remoteIp,
	now = new Date()
}: HandleContactOptions): Promise<Response> {
	const { submission, fieldErrors } = await readSubmission(request);

	if (!submission) {
		return jsonResponse(
			{
				success: false,
				error: 'validation',
				message: '入力内容を確認してください。',
				fieldErrors
			},
			400
		);
	}

	if (!env.TURNSTILE_SECRET_KEY) {
		return jsonResponse(
			{
				success: false,
				error: 'server_config',
				message: '送信に必要な設定が不足しています。'
			},
			500
		);
	}

	const turnstileStatus = await verifyTurnstile(submission, env, fetcher, remoteIp);
	if (turnstileStatus === 'failed') {
		return jsonResponse(
			{
				success: false,
				error: 'turnstile_failed',
				message: '認証に失敗しました。もう一度お試しください。'
			},
			403
		);
	}
	if (turnstileStatus === 'unavailable') {
		return jsonResponse(
			{
				success: false,
				error: 'turnstile_unavailable',
				message: '認証サービスに接続できませんでした。時間をおいて再度お試しください。'
			},
			502
		);
	}

	if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL) {
		return jsonResponse(
			{
				success: false,
				error: 'server_config',
				message: '送信に必要な設定が不足しています。'
			},
			500
		);
	}

	const sent = await sendContactEmail(submission, env, fetcher, now);
	if (!sent) {
		return jsonResponse(
			{
				success: false,
				error: 'send_failed',
				message: 'メール送信に失敗しました。時間をおいて再度お試しください。'
			},
			502
		);
	}

	return jsonResponse({ success: true });
}
