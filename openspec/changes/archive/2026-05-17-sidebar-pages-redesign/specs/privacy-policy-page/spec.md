## ADDED Requirements

### Requirement: App provides a dedicated privacy policy page
The application SHALL provide a dedicated page at `/privacy-policy` that describes how user data and browser APIs are used within the application.

#### Scenario: User navigates to the privacy policy page
- **WHEN** the user activates the `プライバシーポリシー` item in the sidebar
- **THEN** the application navigates to `/privacy-policy`
- **AND** the page displays a structured privacy policy document

#### Scenario: Page returns 200 with SSR
- **WHEN** a request is made to `/privacy-policy`
- **THEN** the server returns HTTP 200 with rendered HTML content

### Requirement: Privacy policy discloses Geolocation API usage
The privacy policy SHALL inform users that the Geolocation API is used only when the user activates the "現在地" button or requests route navigation, that location data is not transmitted to the app's servers, and that it is sent only to the routing service (OSRM) for route calculation.

#### Scenario: User reads geolocation disclosure
- **WHEN** the user views the privacy policy
- **THEN** the page explains that location access is optional and triggered by user action only

### Requirement: Privacy policy discloses localStorage usage
The privacy policy SHALL inform users that `localStorage` is used to persist display settings (marker style, font choice, solid color), that no personally identifiable information is stored, and that settings can be cleared by clearing browser storage.

#### Scenario: User reads localStorage disclosure
- **WHEN** the user views the privacy policy
- **THEN** the page explains that only display preferences are saved locally and no personal data is stored

### Requirement: Privacy policy discloses third-party service requests
The privacy policy SHALL inform users that the application loads resources from third-party services including OpenFreeMap (map tiles), Mapillary (facility vicinity images), and OSRM (route calculation).

#### Scenario: User reads third-party service list
- **WHEN** the user views the privacy policy
- **THEN** the page lists OpenFreeMap, Mapillary, and OSRM as external services contacted by the application
- **AND** the page notes that each service may log request metadata per their own privacy policies

### Requirement: Privacy policy states no personal data is collected by the application
The privacy policy SHALL explicitly state that the application does not collect, store, or transmit any personally identifiable information to its own servers, and that no analytics or tracking cookies are used.

#### Scenario: User reads no-collection statement
- **WHEN** the user views the privacy policy
- **THEN** the page clearly states that the application itself does not collect personal data
- **AND** the page states that no tracking cookies or analytics are used
