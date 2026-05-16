## ADDED Requirements

### Requirement: App provides a dedicated data information page
The application SHALL provide a dedicated page at `/about-data` that describes the data sources used in the application, the scope of coverage, and important usage caveats.

#### Scenario: User navigates to the about-data page
- **WHEN** the user activates the `データについて` item in the sidebar
- **THEN** the application navigates to `/about-data`
- **AND** the page displays a clear page title and reading-oriented layout

#### Scenario: Page returns 200 with SSR
- **WHEN** a request is made to `/about-data`
- **THEN** the server returns HTTP 200 with rendered HTML content

### Requirement: About-data page lists all data sources
The about-data page SHALL list all external data sources used in the application, including the name of each data provider, the type of data they supply, and a link to the source URL where available.

#### Scenario: User reads data source list
- **WHEN** the user views the about-data page
- **THEN** the page displays the following data sources at minimum:
  - 一般社団法人電池工業会（乾電池）
  - 一般社団法人JBRC（充電式電池）
  - インクカートリッジ里帰りプロジェクト（インクカートリッジ）
  - 使用済み食用油の都内回収所（食用油）
  - 加熱式たばこ機器等の回収・リサイクル活動（加熱式たばこ）
- **AND** each entry includes a link to the original source URL

### Requirement: About-data page communicates data accuracy caveats
The about-data page SHALL inform users that the data may not be up to date and that they should verify acceptance conditions directly with each facility.

#### Scenario: User reads accuracy caveats
- **WHEN** the user views the about-data page
- **THEN** the page includes a notice that the data may not reflect the latest state
- **AND** the page advises users to confirm with facilities before visiting

### Requirement: About-data page explains the license terms for data and map tiles
The about-data page SHALL note that collection point data is subject to the terms of each data provider, and that map tiles are provided by OpenFreeMap under its own terms.

#### Scenario: User reads license section
- **WHEN** the user views the about-data page
- **THEN** the page includes a section on data licensing referencing each provider's terms
- **AND** the page references OpenFreeMap for map tile licensing
