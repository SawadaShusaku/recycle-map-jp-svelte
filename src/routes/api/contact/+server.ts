import { env } from '$env/dynamic/private';
import { handleContactSubmission } from '$lib/server/contact';
import type { RequestHandler } from './$types';

type ContactPlatformEnv = {
	TURNSTILE_SECRET_KEY?: string;
	RESEND_API_KEY?: string;
	CONTACT_FROM_EMAIL?: string;
	CONTACT_TO_EMAIL?: string;
};

export const POST: RequestHandler = async ({ request, platform }) => {
	const platformEnv = platform?.env as ContactPlatformEnv | undefined;

	return handleContactSubmission({
		request,
		env: {
			TURNSTILE_SECRET_KEY: platformEnv?.TURNSTILE_SECRET_KEY ?? env.TURNSTILE_SECRET_KEY,
			RESEND_API_KEY: platformEnv?.RESEND_API_KEY ?? env.RESEND_API_KEY,
			CONTACT_FROM_EMAIL: platformEnv?.CONTACT_FROM_EMAIL ?? env.CONTACT_FROM_EMAIL,
			CONTACT_TO_EMAIL: platformEnv?.CONTACT_TO_EMAIL ?? env.CONTACT_TO_EMAIL
		},
		remoteIp: request.headers.get('CF-Connecting-IP')
	});
};
