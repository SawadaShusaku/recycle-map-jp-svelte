const EARTH_RADIUS_KM = 6371;
const DEG_TO_RAD = Math.PI / 180;
const DETOUR_COEFFICIENT = 1.3;
const MINUTES_PER_HOUR = 60;

const SPEEDS_KMH = {
  foot: 4.8,
  bike: 15,
  car: 30,
} as const;

export function calculateHaversineDistance(lng1: number, lat1: number, lng2: number, lat2: number): number {
  const dLat = (lat2 - lat1) * DEG_TO_RAD;
  const dLng = (lng2 - lng1) * DEG_TO_RAD;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * DEG_TO_RAD) * Math.cos(lat2 * DEG_TO_RAD) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

export function estimateRoadDistance(straightLineDistanceKm: number): number {
  return straightLineDistanceKm * DETOUR_COEFFICIENT;
}

export type TravelMode = 'foot' | 'bike' | 'car';

export function estimateTravelTimeMinutes(roadDistanceKm: number, mode: TravelMode): number {
  const speedKmH = SPEEDS_KMH[mode] ?? SPEEDS_KMH.foot;
  return (roadDistanceKm / speedKmH) * MINUTES_PER_HOUR;
}
