## ADDED Requirements

### Requirement: Sidebar-linked contact page
The application SHALL provide a dedicated `/contact` page for user inquiries and feedback. The page SHALL be reachable from the sidebar `お問い合わせ` item and SHALL use the same visual tone as existing informational pages, including page metadata, a return link, readable Japanese copy, and decorative SVG assets that do not interfere with form interaction.

#### Scenario: User opens the contact page from the sidebar
- **WHEN** the user activates the `お問い合わせ` item in the sidebar
- **THEN** the application navigates to `/contact`
- **AND** the contact page shows a clear `お問い合わせ` title and inquiry-focused content

#### Scenario: Contact page matches informational page tone
- **WHEN** the user views the contact page
- **THEN** the layout uses the existing informational page visual language
- **AND** decorative SVG assets are present without covering controls or text

#### Scenario: User returns from the contact page
- **WHEN** the user activates the page's return control
- **THEN** the application returns to the map entry point and can reopen the sidebar consistently with existing informational pages

### Requirement: Contact form fields and validation
The contact page SHALL provide a form with required name, email address, message, and Turnstile verification fields. The client SHALL prevent duplicate submissions while a request is pending, and the server MUST validate required fields, email shape, and message length before sending email.

#### Scenario: User submits valid contact details
- **WHEN** the user enters a name, valid email address, message, and a valid Turnstile token
- **THEN** the form submission is accepted for server-side verification and email delivery

#### Scenario: User omits required details
- **WHEN** the user submits the form without a required name, email address, message, or Turnstile token
- **THEN** the application shows a clear validation error
- **AND** no email is sent

#### Scenario: User submits invalid field values
- **WHEN** the user submits an invalid email address or a message outside the accepted length limits
- **THEN** the server rejects the request with a validation error
- **AND** no email is sent

#### Scenario: User submits repeatedly while pending
- **WHEN** a contact submission is already in progress
- **THEN** the form prevents an additional concurrent submission

### Requirement: Turnstile script and widget integration
The application SHALL load the Cloudflare Turnstile browser script from the base HTML head and SHALL render a Turnstile widget on the contact form using site key `0x4AAAAAADSblskoxiF4EWxq`. The Svelte component MUST remain safe during SSR by avoiding browser-only global access during server rendering.

#### Scenario: Contact page renders Turnstile widget anchor
- **WHEN** the contact page is rendered
- **THEN** the form includes a Turnstile widget element configured with the public site key

#### Scenario: Base document loads Turnstile script
- **WHEN** the application document is served
- **THEN** the head includes Cloudflare's Turnstile API script so the widget can initialize in the browser

#### Scenario: SSR renders the contact page
- **WHEN** the contact page is rendered on the server
- **THEN** rendering does not throw due to missing `window`, `document`, or Turnstile browser globals

### Requirement: Server-side Turnstile verification
The contact submission endpoint MUST verify the submitted `cf-turnstile-response` token with Cloudflare's siteverify endpoint before sending email. The endpoint MUST include `TURNSTILE_SECRET_KEY`, the submitted token, and the connecting IP address when available.

#### Scenario: Turnstile verification succeeds
- **WHEN** Cloudflare siteverify returns success for the submitted token
- **THEN** the endpoint may continue to email delivery

#### Scenario: Turnstile verification fails
- **WHEN** Cloudflare siteverify rejects the submitted token
- **THEN** the endpoint returns a spam or verification failure response
- **AND** no Resend request is made

#### Scenario: Turnstile secret is not configured
- **WHEN** the endpoint receives a submission but `TURNSTILE_SECRET_KEY` is unavailable
- **THEN** the endpoint returns a server error
- **AND** no Resend request is made

### Requirement: Resend email delivery
After validation and successful Turnstile verification, the contact submission endpoint SHALL send an email through Resend using `RESEND_API_KEY`. The email SHALL include the submitter name, email address, message body, and enough source context to identify that it came from the contact page, while avoiding persistence of submissions into public data artifacts.

#### Scenario: Resend delivery succeeds
- **WHEN** Resend accepts the email request
- **THEN** the endpoint returns a success response
- **AND** the page shows a completion message without resubmitting the form

#### Scenario: Resend delivery fails
- **WHEN** Resend rejects the email request or the request fails
- **THEN** the endpoint returns a send failure response
- **AND** the page shows a retry-oriented error message

#### Scenario: Resend API key is not configured
- **WHEN** the endpoint receives a verified submission but `RESEND_API_KEY` is unavailable
- **THEN** the endpoint returns a server error
- **AND** no email delivery is attempted

### Requirement: Contact submissions stay outside public map data
The contact workflow MUST NOT add user-submitted contact content to the public D1 facility database, GeoJSON files, D1 seed files, static data artifacts, or committed fixtures.

#### Scenario: Contact message is submitted
- **WHEN** a user submits a contact message
- **THEN** the application sends it by email only
- **AND** the message is not written to public map data stores or repository data files

