## Why

The current route time estimation relies on the OSRM public demo API which has proven inaccurate, particularly in calculating realistic travel times for different transport modes. The user wants to replace it with a lightweight, formula-based time estimation using the Haversine formula for straight-line distance, multiplied by a detour coefficient (1.3 for Japan), and then converting this estimated road distance to time based on standard speeds for foot (4.8 km/h), bicycle (15 km/h), and car (30-40 km/h).

## What Changes

- Stop using the OSRM API for route distance/duration calculations.
- Introduce a client-side calculation using the Haversine formula to compute straight-line distance between the user's location and the target facility.
- Apply a detour coefficient (`1.3`) to the straight-line distance to estimate realistic road distance.
- Calculate required travel time based on the selected travel mode using average speeds:
  - Foot: 4.8 km/h
  - Bicycle: 15 km/h
  - Car: 30 km/h (using the lower end of 30-40 km/h for urban areas to be conservative).
- Bring back the UI to display the required time that was previously removed.
- Route drawing (`routeGeoJSON`) will be disabled since we no longer have actual road geometry from OSRM.

## Capabilities

### New Capabilities
- `time-estimation`: Client-side calculation of estimated route distance and time using the Haversine formula and Japan-specific detour coefficients.

### Modified Capabilities

## Impact

- `src/routes/+page.svelte`: Modifications to `getRoute()` to remove OSRM API call and replace with local math calculations. UI for time estimation will be restored.
