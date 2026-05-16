## ADDED Requirements

### Requirement: Content pages use decoration SVG assets for visual enhancement
The application's static content pages (usage, about-data, updates, privacy-policy) SHALL incorporate SVG decoration assets from `/static/decorations/` as background or accent visual elements to achieve a premium, contemporary design aesthetic.

#### Scenario: Decoration assets appear on content pages
- **WHEN** the user views any content page (usage, about-data, updates, or privacy-policy)
- **THEN** at least one decoration SVG (e.g., blob, dots, sparkle) is visible as a non-interactive decorative element
- **AND** the decoration does not obscure or reduce the readability of the page text

#### Scenario: Decorations are purely presentational
- **WHEN** a screen reader encounters a decoration SVG
- **THEN** the decoration has aria-hidden="true" or equivalent so it is not announced to assistive technology
