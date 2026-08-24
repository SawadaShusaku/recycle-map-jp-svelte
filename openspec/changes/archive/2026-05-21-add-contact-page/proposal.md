## Why

Users need an in-app way to send corrections, questions, and feedback without leaving the recycling map experience. A dedicated contact page also gives the site owner a controlled path for receiving messages while protecting the endpoint from automated spam.

## What Changes

- Add an `お問い合わせ` destination to the sidebar informational navigation.
- Add a dedicated contact page that matches the existing informational page tone, layout density, and visual language.
- Add an accessible contact form with name, email, message, and Cloudflare Turnstile verification.
- Add a server-side contact submission endpoint that verifies Turnstile before sending mail through Resend.
- Add required runtime configuration for `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, recipient/sender settings, and the public Turnstile site key.
- Preserve private-data boundaries: contact submissions are transient message payloads and are not added to public map data, D1 seed data, or repository fixtures.

## Capabilities

### New Capabilities
- `contact-page`: Covers the sidebar-linked contact page, Turnstile-protected form behavior, server-side verification, and Resend email delivery.

### Modified Capabilities
- `sidebar-navigation`: The informational navigation contract changes to include an available `お問い合わせ` item that opens the contact page.

## Impact

- `src/lib/components/SettingsSidebar.svelte` needs a new available informational navigation row.
- `src/routes/contact/+page.svelte` and a contact submission endpoint need to be added.
- `src/app.html` needs the Cloudflare Turnstile API script.
- Cloudflare Worker environment bindings/secrets need to include `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY`; public configuration should expose the Turnstile site key `0x4AAAAAADSblskoxiF4EWxq`.
- Unit and/or route tests should cover validation, Turnstile failure, Resend failure, and successful submission response behavior.
- `npm run smoke` is required because the change touches SSR-rendered pages and browser-only Turnstile behavior.
