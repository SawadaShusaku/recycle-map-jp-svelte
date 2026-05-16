## Context
The current app displays distance and travel time from a user's location to a selected facility using an external OSRM API. This API has proven inaccurate and sometimes slow or unreliable. The user wants to replace this with a local calculation: straight-line distance computed using the Haversine formula, multiplied by a detour coefficient (1.3 for Japan) to approximate actual road distance, and then divided by standard speeds depending on travel mode (foot: 4.8 km/h, bike: 15 km/h, car: 30 km/h) to get the estimated time in minutes.

## Goals / Non-Goals

**Goals:**
- Implement a client-side utility to compute Haversine distance.
- Multiply straight-line distance by a `1.3` detour coefficient.
- Calculate travel time based on 3 distinct modes.
- Remove external OSRM API calls.
- Restore the required time display UI in the map view.

**Non-Goals:**
- Drawing accurate route line geometries on the map (we won't have road geometries, so we will simply stop drawing the route polyline).
- Accounting for elevation, traffic signals, or real-time traffic data.

## Decisions
- **Local computation**: Replaces network dependency, providing instant results and saving external API load.
- **Haversine formula implementation**: Will be a pure function taking two coordinate pairs.
- **Detour coefficient of 1.3**: Selected based on general statistical averages for Japanese urban roads.
- **Speeds**: Foot (4.8 km/h), Bike (15 km/h), Car (30 km/h) are chosen as simple, realistic averages for city travel.

## Risks / Trade-offs
- [Risk] Loss of map route drawing → We will no longer show the polyline. This is a trade-off for speed, reliability, and removing the inaccurate OSRM dependency.
- [Risk] Inaccurate times for highly anomalous geography (e.g., across a river with no nearby bridge) → A constant detour coefficient of 1.3 can't capture geographical barriers, but it provides a "good enough" approximation without routing engine overhead.
