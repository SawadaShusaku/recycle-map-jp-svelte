<svelte:head>
	<title>{buildPageTitle('お問い合わせ')}</title>
	<meta
		name="description"
		content={`${SITE_NAME_JA}へのお問い合わせ。掲載情報の修正依頼、使い方の質問、フィードバックを送信できます。`}
	/>
	<meta property="og:title" content={buildPageTitle('お問い合わせ')} />
	<meta
		property="og:description"
		content={`${SITE_NAME_JA}へのお問い合わせフォームです。掲載情報の修正依頼やフィードバックを送信できます。`}
	/>
</svelte:head>

<script lang="ts">
	import { browser } from '$app/environment';
	import { CONTACT_MESSAGE_MAX_LENGTH, TURNSTILE_SITE_KEY } from '$lib/contact';
	import { buildPageTitle, SITE_NAME_JA } from '$lib/site.js';
	import { Building2, CheckCircle2, Mail, MessageSquareText, Send, UserRound } from 'lucide-svelte';

	type SubmitState =
		| 'idle'
		| 'pending'
		| 'validation'
		| 'turnstile'
		| 'send'
		| 'success';

	type ContactApiResponse = {
		success?: boolean;
		error?: string;
		message?: string;
		fieldErrors?: Partial<Record<'name' | 'email' | 'message' | 'turnstile', string>>;
	};

	let formElement = $state<HTMLFormElement>();
	let submitState = $state<SubmitState>('idle');
	let fieldErrors = $state<ContactApiResponse['fieldErrors']>({});
	let statusMessage = $state('');
	let messageLength = $state(0);

	const isPending = $derived(submitState === 'pending');

	function setMessageFromResponse(result: ContactApiResponse, fallback: string) {
		statusMessage = result.message ?? fallback;
	}

	function resetTurnstile() {
		if (!browser) return;
		const turnstile = (globalThis as { turnstile?: { reset?: () => void } }).turnstile;
		turnstile?.reset?.();
	}

	function updateMessageLength(event: Event) {
		messageLength = event.currentTarget instanceof HTMLTextAreaElement
			? event.currentTarget.value.length
			: 0;
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (isPending || !formElement) return;

		submitState = 'pending';
		fieldErrors = {};
		statusMessage = '送信しています。';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Accept': 'application/json' },
				body: new FormData(formElement)
			});
			const result = (await response.json().catch(() => ({}))) as ContactApiResponse;

			if (response.ok && result.success) {
				submitState = 'success';
				statusMessage = '送信しました。内容を確認して、必要に応じて返信します。';
				formElement.reset();
				messageLength = 0;
				resetTurnstile();
				return;
			}

			fieldErrors = result.fieldErrors ?? {};
			if (result.error === 'validation') {
				submitState = 'validation';
				setMessageFromResponse(result, '入力内容を確認してください。');
			} else if (result.error === 'turnstile_failed' || result.error === 'turnstile_unavailable') {
				submitState = 'turnstile';
				setMessageFromResponse(result, '認証に失敗しました。もう一度お試しください。');
				resetTurnstile();
			} else {
				submitState = 'send';
				setMessageFromResponse(result, '送信できませんでした。時間をおいて再度お試しください。');
				resetTurnstile();
			}
		} catch {
			submitState = 'send';
			statusMessage = '通信に失敗しました。時間をおいて再度お試しください。';
			resetTurnstile();
		}
	}
</script>

<div class="min-h-screen bg-[#f7f7f2] text-stone-800">
	<div
		class="relative mx-auto flex w-full max-w-4xl flex-col gap-12 px-8 py-12 sm:px-12 sm:py-16 lg:max-w-5xl xl:max-w-6xl"
	>
		<a
			href="/"
			onclick={() => sessionStorage.setItem('openSidebar', '1')}
			class="group relative z-10 inline-flex w-fit items-center gap-2"
		>
			<svg
				class="h-7 w-7 text-stone-400 transition-colors group-hover:text-stone-800"
				viewBox="0 0 60 60"
				fill="none"
				stroke="currentColor"
				stroke-width="5"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M 40 15 L 25 30 L 40 45" />
				<path d="M 25 15 L 10 30 L 25 45" />
			</svg>
			<span class="text-xl font-bold text-stone-600 transition-colors group-hover:text-stone-900"
				>戻る</span
			>
		</a>

		<section class="relative border-b border-stone-300 pb-10">
			<img
				src="/decorations/blob_green_blue.svg"
				alt=""
				aria-hidden="true"
				class="pointer-events-none absolute -right-16 -top-12 z-[1] h-56 w-56 opacity-[0.90] sm:-right-36 sm:-top-28 sm:h-80 sm:w-80"
			/>
			<div class="relative z-10">
				<p class="text-xs font-bold tracking-[0.18em] text-stone-500">CONTACT</p>
				<h1 class="mt-2 flex items-center gap-3 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
					<span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-white/80 text-stone-800 shadow-sm">
						<Mail size={22} aria-hidden="true" />
					</span>
					<span>お問い合わせ</span>
				</h1>
				<div class="mt-6 space-y-7 text-base leading-8 text-stone-600 sm:text-lg">
					<div class="space-y-3">
						<p>当サイトをご利用いただきありがとうございます。</p>
						<p>
							掲載情報の修正依頼、使い方に関するご質問、改善のフィードバックは、以下のフォームよりお送りください。
						</p>
					</div>

					<div class="max-w-4xl border-t border-stone-200 pt-6">
						<h2 class="flex items-center gap-3 text-lg font-black leading-8 text-stone-900 sm:text-xl">
							<span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-white/80 text-stone-800 shadow-sm">
								<Building2 size={22} aria-hidden="true" />
							</span>
							各リサイクル施設に関するお問い合わせについて
						</h2>
						<p class="mt-3">
							当サイトは個人が運営する情報マップであり、掲載されている各施設とは一切関係がございません。「施設の開館時間」「回収可能な品目の詳細」「利用方法の確認」など、施設そのものに関するご質問・ご連絡は、当フォームにお送りいただいてもお答えできません。お手数ですが、各施設の公式サイトをご確認いただくか、施設側へ直接お問い合わせいただきますようお願いいたします。
						</p>
					</div>
				</div>
			</div>
		</section>

		<section class="mx-auto w-full max-w-5xl">
			<form
				bind:this={formElement}
				onsubmit={handleSubmit}
				class="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10"
				novalidate
			>
				<img
					src="/decorations/wave_line.svg"
					alt=""
					aria-hidden="true"
					class="pointer-events-none absolute right-6 top-6 h-12 w-28 opacity-25 sm:right-10 sm:top-10"
				/>
				<fieldset class="relative z-10 space-y-6" disabled={isPending}>
					<div>
						<label for="name" class="inline-flex items-center gap-2 text-sm font-bold text-stone-900">
							<UserRound size={16} aria-hidden="true" />
							お名前
						</label>
						<input
							id="name"
							name="name"
							type="text"
							required
							maxlength="120"
							autocomplete="name"
							aria-invalid={fieldErrors?.name ? 'true' : undefined}
							aria-describedby={fieldErrors?.name ? 'name-error' : undefined}
							class="mt-2 w-full rounded-2xl border border-stone-300 bg-[#fffdf8] px-4 py-3 text-base text-stone-900 outline-none transition focus:border-stone-700 focus:bg-white"
						/>
						{#if fieldErrors?.name}
							<p id="name-error" class="mt-2 text-sm font-bold text-red-700">{fieldErrors.name}</p>
						{/if}
					</div>

					<div>
						<label for="email" class="inline-flex items-center gap-2 text-sm font-bold text-stone-900">
							<Mail size={16} aria-hidden="true" />
							メールアドレス
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							maxlength="254"
							autocomplete="email"
							aria-invalid={fieldErrors?.email ? 'true' : undefined}
							aria-describedby={fieldErrors?.email ? 'email-error' : undefined}
							class="mt-2 w-full rounded-2xl border border-stone-300 bg-[#fffdf8] px-4 py-3 text-base text-stone-900 outline-none transition focus:border-stone-700 focus:bg-white"
						/>
						{#if fieldErrors?.email}
							<p id="email-error" class="mt-2 text-sm font-bold text-red-700">{fieldErrors.email}</p>
						{/if}
					</div>

					<div>
						<div class="flex items-end justify-between gap-4">
							<label for="message" class="inline-flex items-center gap-2 text-sm font-bold text-stone-900">
								<MessageSquareText size={16} aria-hidden="true" />
								お問い合わせ内容
							</label>
							<span class="text-xs font-bold text-stone-500">
								{messageLength}/{CONTACT_MESSAGE_MAX_LENGTH}
							</span>
						</div>
						<textarea
							id="message"
							name="message"
							required
							maxlength={CONTACT_MESSAGE_MAX_LENGTH}
							rows="8"
							oninput={updateMessageLength}
							aria-invalid={fieldErrors?.message ? 'true' : undefined}
							aria-describedby={fieldErrors?.message ? 'message-error' : undefined}
							class="mt-2 w-full resize-y rounded-2xl border border-stone-300 bg-[#fffdf8] px-4 py-3 text-base leading-7 text-stone-900 outline-none transition focus:border-stone-700 focus:bg-white"
						></textarea>
						{#if fieldErrors?.message}
							<p id="message-error" class="mt-2 text-sm font-bold text-red-700">
								{fieldErrors.message}
							</p>
						{/if}
					</div>

					<div>
						<div
							class="cf-turnstile min-h-[65px]"
							data-sitekey={TURNSTILE_SITE_KEY}
							data-testid="contact-turnstile"
						></div>
						{#if fieldErrors?.turnstile}
							<p class="mt-2 text-sm font-bold text-red-700">{fieldErrors.turnstile}</p>
						{/if}
					</div>

					<button
						type="submit"
						class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 px-5 py-3 text-base font-black text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-400 sm:w-auto"
					>
						{#if submitState === 'success'}
							<CheckCircle2 size={19} />
							送信済み
						{:else}
							<Send size={19} />
							{isPending ? '送信中...' : '送信する'}
						{/if}
					</button>
				</fieldset>

				{#if statusMessage}
					<p
						class="relative z-10 mt-6 rounded-2xl border px-4 py-3 text-sm font-bold leading-6"
						class:border-emerald-200={submitState === 'success'}
						class:bg-emerald-50={submitState === 'success'}
						class:text-emerald-900={submitState === 'success'}
						class:border-red-200={submitState !== 'success' && submitState !== 'pending'}
						class:bg-red-50={submitState !== 'success' && submitState !== 'pending'}
						class:text-red-800={submitState !== 'success' && submitState !== 'pending'}
						class:border-stone-200={submitState === 'pending'}
						class:bg-stone-50={submitState === 'pending'}
						class:text-stone-700={submitState === 'pending'}
						aria-live="polite"
					>
						{statusMessage}
					</p>
				{/if}
			</form>
		</section>

		<div class="flex justify-center">
			<img
				src="/decorations/cross_sparkle.svg"
				alt=""
				aria-hidden="true"
				class="pointer-events-none h-12 w-12"
			/>
		</div>
	</div>
</div>
