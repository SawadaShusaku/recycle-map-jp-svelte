import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import type { LineString } from 'geojson';

/**
 * OpenRouteService 経路検索プロキシ。
 *
 * - 入力: ?lng1=&lat1=&lng2=&lat2=&mode=foot|bike|car
 * - APIキーはサーバー側のみで保持し、クライアントには経路ジオメトリのみ返す
 */

const ORS_BASE_URL = 'https://api.openrouteservice.org/v2/directions';

const ORS_PROFILES: Record<string, string> = {
  foot: 'foot-walking',
  bike: 'cycling-regular',
  car: 'driving-car',
};

function isValidLngLat(lng: number, lat: number): boolean {
  return Number.isFinite(lng) && Number.isFinite(lat) && lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
}

type OrsResponse = {
  routes?: Array<{
    geometry: string; // encoded polyline or GeoJSON depending on request
    summary?: { distance: number; duration: number };
  }>;
  features?: Array<{
    geometry: LineString;
    properties?: { summary?: { distance: number; duration: number } };
  }>;
};

export const GET: RequestHandler = async ({ url, platform }) => {
  const lng1 = Number(url.searchParams.get('lng1'));
  const lat1 = Number(url.searchParams.get('lat1'));
  const lng2 = Number(url.searchParams.get('lng2'));
  const lat2 = Number(url.searchParams.get('lat2'));
  const mode = url.searchParams.get('mode') ?? 'foot';

  if (!isValidLngLat(lng1, lat1) || !isValidLngLat(lng2, lat2)) {
    throw error(400, 'lng1, lat1, lng2, lat2 are required');
  }

  const profile = ORS_PROFILES[mode] ?? ORS_PROFILES['foot'];

  const platformEnv = platform?.env as Record<string, string | undefined> | undefined;
  const apiKey = platformEnv?.OPENROUTESERVICE_API_KEY ?? env.OPENROUTESERVICE_API_KEY;
  if (!apiKey) {
    throw error(500, 'OPENROUTESERVICE_API_KEY not configured');
  }

  const apiUrl = `${ORS_BASE_URL}/${profile}/geojson`;

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiKey,
    },
    body: JSON.stringify({
      coordinates: [[lng1, lat1], [lng2, lat2]],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.warn('[ors proxy] non-ok', res.status, body.slice(0, 200));
    throw error(502, `OpenRouteService error: ${res.status}`);
  }

  const data = await res.json() as OrsResponse;
  const feature = data.features?.[0];

  if (!feature?.geometry) {
    throw error(502, 'No route geometry returned');
  }

  return json({ geometry: feature.geometry });
};
