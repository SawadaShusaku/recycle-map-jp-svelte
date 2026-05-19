## 1. Core Logic Implementation

- [x] 1.1 Create a utility function to calculate the Haversine distance between two coordinates.
- [x] 1.2 Implement logic to multiply the straight-line distance by a detour coefficient of 1.3 to estimate road distance.
- [x] 1.3 Create a function to calculate estimated travel time based on distance and travel mode (Foot: 4.8km/h, Bike: 15km/h, Car: 30km/h).
- [x] 1.4 Update `jj describe` with progress.

## 2. UI and Component Updates

- [x] 2.1 Modify `getRoute()` in `src/routes/+page.svelte` to remove the external OSRM API fetch logic.
- [x] 2.2 Refactor `getRoute()` to use the new local distance and time calculation functions.
- [x] 2.3 Restore the UI elements in `src/routes/+page.svelte` that display the required time `routeInfo.duration`.
- [x] 2.4 Remove or safely disable the map polyline drawing logic since road geometries are no longer retrieved.
- [x] 2.5 Run browser smoke tests (`npm run smoke`) to ensure calculations and UI work as expected without errors.
- [x] 2.6 Update `jj describe` with final progress.
