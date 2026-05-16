## ADDED Requirements

### Requirement: App provides a dedicated updates page
The application SHALL provide a dedicated page at `/updates` that communicates recent changes to the application's data coverage and feature set.

#### Scenario: User navigates to the updates page
- **WHEN** the user activates the `更新情報` item in the sidebar
- **THEN** the application navigates to `/updates`
- **AND** the page displays a list of updates in reverse chronological order

#### Scenario: Page returns 200 with SSR
- **WHEN** a request is made to `/updates`
- **THEN** the server returns HTTP 200 with rendered HTML content

### Requirement: Updates page lists changes in reverse chronological order
The updates page SHALL display each update entry with at minimum a date, a title, and a brief description. Entries SHALL be ordered from newest to oldest.

#### Scenario: User reads the updates list
- **WHEN** the user views the updates page
- **THEN** entries appear from newest to oldest
- **AND** each entry includes a date and description of the change

### Requirement: Updates page reflects actual historical changes
The updates page SHALL document real milestones for this application such as national coverage expansion, D1 database migration, and new recycling categories added.

#### Scenario: User reads milestone updates
- **WHEN** the user views the updates page
- **THEN** the page includes at least the following entries:
  - 全国対応（都道府県単位のデータ追加）
  - Cloudflare D1へのデータ移行
  - カテゴリの追加
