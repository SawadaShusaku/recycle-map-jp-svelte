## MODIFIED Requirements

### Requirement: Informational menu items are prioritized and link-ready
The sidebar SHALL present informational menu items in a fixed priority order and SHALL render them as navigation-style rows that can connect to dedicated routes. All four informational items SHALL be connected to in-app destination pages and SHALL render as active navigation rows.

#### Scenario: Informational items are shown in priority order
- **WHEN** the user views the informational navigation section
- **THEN** the items appear in this order: `使い方`, `データについて`, `更新情報`, `プライバシーポリシー`

#### Scenario: All informational items are available
- **WHEN** the user views any informational item in the sidebar
- **THEN** the sidebar renders it as an active navigation row (not disabled)
- **AND** the row indicates it can open another page

#### Scenario: User opens the about-data page from the sidebar
- **WHEN** the user activates the `データについて` item
- **THEN** the application navigates to `/about-data`

#### Scenario: User opens the updates page from the sidebar
- **WHEN** the user activates the `更新情報` item
- **THEN** the application navigates to `/updates`

#### Scenario: User opens the privacy policy from the sidebar
- **WHEN** the user activates the `プライバシーポリシー` item
- **THEN** the application navigates to `/privacy-policy`
