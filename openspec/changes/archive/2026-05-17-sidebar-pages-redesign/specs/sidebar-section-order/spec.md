## ADDED Requirements

### Requirement: Sidebar home view places info/help section above display settings
The sidebar home view SHALL render the informational navigation section (情報・ヘルプ) before the display settings section (表示設定) so that content-oriented navigation is immediately accessible at the top.

#### Scenario: User opens the sidebar
- **WHEN** the user opens the sidebar from the main map view
- **THEN** the 情報・ヘルプ section appears above the 表示設定 section in the sidebar body
- **AND** both sections remain visible without scrolling on typical mobile viewport heights
