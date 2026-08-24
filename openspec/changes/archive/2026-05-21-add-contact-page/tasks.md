## 1. Configuration and Validation

- [x] 1.1 Confirm required runtime configuration names for `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`.
- [x] 1.2 Add or update environment type declarations for the new private contact email settings.
- [x] 1.3 Confirm the Turnstile public site key `0x4AAAAAADSblskoxiF4EWxq` is centralized for the contact page.

## 2. Sidebar and Page UI

- [x] 2.1 Add an available `お問い合わせ` item to the sidebar informational menu, ordered after `プライバシーポリシー`.
- [x] 2.2 Add the Turnstile API script to `src/app.html` without introducing SSR-only browser global access.
- [x] 2.3 Create `src/routes/contact/+page.svelte` with metadata, sidebar return behavior, existing page tone, decorative SVG assets, and accessible form fields.
- [x] 2.4 Implement client submission states for idle, pending, validation error, verification failure, send failure, and success.
- [x] 2.5 Ensure the form prevents duplicate submissions while pending and keeps controls readable on mobile and desktop widths.

## 3. Contact Submission API

- [x] 3.1 Create a contact submission endpoint that accepts form data and rejects non-POST methods.
- [x] 3.2 Validate required name, email, message, Turnstile token, email shape, and message length before external calls.
- [x] 3.3 Verify `cf-turnstile-response` with Cloudflare siteverify using `TURNSTILE_SECRET_KEY` and `CF-Connecting-IP` when available.
- [x] 3.4 Send verified submissions through Resend using `RESEND_API_KEY`, configured sender, configured recipient, and a reply-to value when appropriate.
- [x] 3.5 Return structured JSON responses for success, validation errors, Turnstile failures, missing configuration, and Resend failures.
- [x] 3.6 Ensure submissions are not written to D1, GeoJSON, static data artifacts, fixtures, or public logs.

## 4. Tests and Verification

- [x] 4.1 Add route/unit tests for missing fields, invalid email, Turnstile failure, missing secrets, Resend failure, and successful delivery.
- [x] 4.2 Add or update a UI/E2E check that the sidebar contact item opens `/contact` and the page renders the Turnstile widget anchor.
- [x] 4.3 Run `npm run check`.
- [x] 4.4 Run `npm run test`.
- [x] 4.5 Run `npm run smoke` because the change touches SSR-rendered UI and browser-only Turnstile integration.

## 5. Review and Version Control

- [x] 5.1 Review the implemented files for secret leakage and accidental persistence of contact payloads.
- [x] 5.2 Run `jj status` to inspect the worktree.
- [x] 5.3 Run `jj describe` after implementation is complete so the change description reflects the finished contact-page work.
