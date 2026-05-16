## MODIFIED Requirements

### Requirement: Sidebar usage guide page uses decoration assets
The usage guide page SHALL incorporate SVG decoration assets from `/static/decorations/` as visual enhancement elements while retaining the same information structure (cautions, numbered guide sections, related links).

#### Scenario: User visits the usage guide with decoration assets present
- **WHEN** the user navigates to `/usage`
- **THEN** the page displays at least one decoration SVG (blob, dots, or sparkle variant)
- **AND** all existing guide sections (区を選ぶ, カテゴリで絞り込む, 地図と施設情報を見る, 表示設定を調整する) remain present
- **AND** the cautions list and related-pages section remain present

#### Scenario: Decoration is non-interactive and accessible
- **WHEN** a screen reader processes the usage guide page
- **THEN** decoration SVG elements are marked aria-hidden or equivalent
- **AND** page content remains fully readable
