## Context

The app already has sidebar-linked informational pages such as `/usage`, `/about-data`, `/updates`, and `/privacy-policy`. Those pages use SvelteKit routes, server-rendered metadata, a warm off-white page background, compact reading layouts, and existing SVG decoration assets from `static/decorations/`.

The new contact workflow crosses frontend UI, SvelteKit server routes, Cloudflare Worker runtime secrets, Cloudflare Turnstile, and Resend. The form must remain SSR-safe while still allowing Turnstile's browser widget to attach after hydration. Contact messages are operational feedback, not map source data, so they must not enter the D1/public data pipeline or be committed as fixtures.

## Goals / Non-Goals

**Goals:**

- Add an `お問い合わせ` entry to the sidebar and route it to `/contact`.
- Provide a polished contact page that matches the current informational page tone and uses existing SVG decoration assets.
- Verify Cloudflare Turnstile tokens server-side before attempting email delivery.
- Send validated submissions through Resend using server-only secrets.
- Return clear client states for validation errors, spam verification failure, send failure, and success.
- Keep contact payloads transient and avoid adding user-submitted content to D1, GeoJSON, static artifacts, or repository data files.

**Non-Goals:**

- Add a persisted contact-message database or admin inbox.
- Add attachments, account identity, reply threading, or rate-limit storage.
- Change recycling facility data, GeoJSON schemas, D1 seed generation, geocoding, or place deduplication.
- Replace existing informational pages or redesign the whole sidebar.

## Decisions

1. Use a SvelteKit page plus API route.

   The contact UI should live at `src/routes/contact/+page.svelte`, and submissions should POST to a server route such as `src/routes/api/contact/+server.ts`. This follows existing API proxy patterns and keeps Resend and Turnstile secrets out of browser code. An alternative was a form action colocated with the page, but a JSON API route gives simpler client state handling for the Turnstile widget and is easier to unit test directly.

2. Load Turnstile globally from `src/app.html`.

   Add Cloudflare's Turnstile API script to the document head with `async` and `defer`, then render a `<div class="cf-turnstile" data-sitekey="0x4AAAAAADSblskoxiF4EWxq">` in the form. This matches Cloudflare's expected integration path and avoids custom browser initialization code. The component must not access `window`, `document`, or `turnstile` during SSR.

3. Verify before sending.

   The API route must read `cf-turnstile-response` from the submitted form data and call `https://challenges.cloudflare.com/turnstile/v0/siteverify` with `TURNSTILE_SECRET_KEY`, the response token, and `CF-Connecting-IP` when available. If verification fails, the route returns `403` and does not call Resend. An alternative was relying on the client widget alone, but that would not protect the Worker endpoint from forged requests.

4. Use direct Resend HTTP calls instead of adding an SDK dependency.

   Resend's send-email endpoint can be called with `fetch` from the Worker runtime using `Authorization: Bearer ${RESEND_API_KEY}`. This keeps the dependency graph unchanged and matches existing proxy routes that use platform `fetch`. If future email behavior grows more complex, the Resend SDK can be introduced later.

5. Keep runtime configuration explicit.

   `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` must be private Worker secrets. Sender and recipient settings should be explicit environment variables, for example `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL`, because Resend requires a verified sender identity and the destination may differ between preview and production. The public site key may be a source constant because it is not secret, but it should be centralized so it is easy to replace.

6. Match existing visual language with existing assets.

   The page should reuse the informational page structure: back link to the sidebar, metadata via `buildPageTitle`, off-white background, bordered content sections, compact but readable form controls, and decorative SVGs such as `blob_green_blue.svg`, `sparkle_asterisk.svg`, `wave_line.svg`, or `outline_blob.svg`. SVGs should support the page visually without becoming the primary content or blocking form use.

## Risks / Trade-offs

- Turnstile script blocked or slow to load -> Keep the form usable enough to show a clear verification-required error, disable duplicate submits while pending, and reset/retry the widget after failure when the browser API is available.
- Missing Worker secrets or email configuration -> Return a server error without exposing secret names to the user; log concise diagnostics on the server and cover the case in route tests.
- Resend rejects sender/domain configuration -> Treat as a send failure and show a retry/contact-later message; document that preview and production need verified sender settings.
- Spam attempts bypassing the page -> Require server-side Turnstile success before calling Resend and validate message length and required fields on the server.
- User-submitted content leaking into public data -> Do not persist submissions to D1, GeoJSON, static files, fixtures, logs, or analytics payloads; email only the minimum fields needed for follow-up.

## Migration Plan

1. Add the page, sidebar link, app-level Turnstile script, server endpoint, and tests.
2. Configure `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` for local/preview/production as appropriate.
3. Deploy to preview and verify success and failure paths with Turnstile and Resend.
4. If production issues occur, temporarily remove or disable the sidebar link while leaving existing map and informational pages unaffected.

## Open Questions

- What exact sender and recipient addresses should be used for preview and production Resend delivery?
- Should successful emails include a reply-to header using the submitter's email, or should replies always go through the site owner address?
