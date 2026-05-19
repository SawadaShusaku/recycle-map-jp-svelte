import type maplibregl from 'maplibre-gl';
import type { FeatureCollection, Point } from 'geojson';

import type { GeoFeature } from '$lib/data.js';
import type { CategoryId, MarkerStyle } from '$lib/types.js';

import {
	CLUSTER_WIDE_AREA_ZOOM,
	CLUSTER_WARD_AREA_ZOOM,
	CLUSTER_WIDE_AREA_RADIUS_PX,
	CLUSTER_WARD_AREA_RADIUS_PX,
	PREFECTURE_CLICK_ZOOM,
	WARD_SUMMARY_CLICK_ZOOM
} from '$lib/constants/map';

export {
	CLUSTER_TRANSITION_ZOOM,
	PREFECTURE_SUMMARY_MAX_ZOOM,
	INDIVIDUAL_MARKER_MIN_ZOOM,
	WARD_SUMMARY_MAX_ZOOM,
	WARD_SUMMARY_CLICK_ZOOM,
	CLUSTER_PREFECTURE_ZOOM,
	CLUSTER_WIDE_AREA_ZOOM,
	CLUSTER_WARD_AREA_ZOOM,
	CLUSTER_WIDE_AREA_RADIUS_PX,
	CLUSTER_WARD_AREA_RADIUS_PX,
	MARKER_ICON_WIDTH,
	MARKER_ICON_HEIGHT,
	MARKER_ICON_SIZE,
	JAPAN_WIDE_CLUSTER_MAX_ZOOM
} from '$lib/constants/map';

const METERS_PER_DEGREE_LATITUDE = 111_320;
const FALLBACK_MUNICIPALITY_AREA_M2 = 75_000_000;
const PREFECTURE_CLUSTER_MIN_RADIUS_SCALE = 1.15;
const PREFECTURE_CLUSTER_MAX_RADIUS_SCALE = 1.8;

export interface MarkerFeatureProperties {
	facilityId: string;
	iconKey: string;
}

export interface MarkerImageDescriptor {
	iconKey: string;
	categories: CategoryId[];
	style: MarkerStyle;
	solidColor?: string;
}

export interface WardSummaryFeatureProperties {
	prefecture: string;
	city: string;
	cityLabel: string;
	summaryType: 'prefecture' | 'municipality';
	facilityCount: number;
	clusterRadiusScale: number;
	sumLng: number;
	sumLat: number;
	minLng: number;
	minLat: number;
	maxLng: number;
	maxLat: number;
	focusMinLng?: number;
	focusMinLat?: number;
	focusMaxLng?: number;
	focusMaxLat?: number;
}

export interface JapanWideSummaryFeatureProperties {
	label: string;
	cityLabel: string;
	facilityCount: number;
}

export function buildFacilityIndex(facilities: GeoFeature[]): Map<string, GeoFeature> {
	return new Map(facilities.map((facility) => [facility.properties.id, facility]));
}

export function resolveSelectedFacility(
	facilityIndex: Map<string, GeoFeature>,
	selectedFacilityId: string | null
): GeoFeature | null {
	if (!selectedFacilityId) return null;
	return facilityIndex.get(selectedFacilityId) ?? null;
}

export function getMarkerIconKey(
	categories: CategoryId[],
	style: MarkerStyle,
	solidColor?: string
): string {
	const categoryKey = categories.join('__') || 'none';
	return ['marker', style, solidColor ?? 'default', categoryKey]
		.join('--')
		.replace(/[^a-z0-9_-]/gi, '-')
		.toLowerCase();
}

function isFiniteCoordinatePair(coordinates: unknown): coordinates is [number, number] {
	return (
		Array.isArray(coordinates) &&
		coordinates.length >= 2 &&
		Number.isFinite(coordinates[0]) &&
		Number.isFinite(coordinates[1])
	);
}

export function buildMarkerFeatureCollection(
	facilities: GeoFeature[],
	style: MarkerStyle,
	solidColor?: string
): FeatureCollection<Point, MarkerFeatureProperties> {
	return {
		type: 'FeatureCollection',
		features: facilities
			.filter((facility) => isFiniteCoordinatePair(facility.geometry.coordinates))
			.map((facility) => ({
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: facility.geometry.coordinates
				},
				properties: {
					facilityId: facility.properties.id,
					iconKey: getMarkerIconKey(facility.properties.categories as CategoryId[], style, solidColor)
				}
			}))
	};
}

export function buildMarkerImageDescriptors(
	facilities: GeoFeature[],
	style: MarkerStyle,
	solidColor?: string
): MarkerImageDescriptor[] {
	const descriptors = new Map<string, MarkerImageDescriptor>();

	for (const facility of facilities) {
		if (!isFiniteCoordinatePair(facility.geometry.coordinates)) continue;
		const categories = facility.properties.categories as CategoryId[];
		const iconKey = getMarkerIconKey(categories, style, solidColor);
		if (!descriptors.has(iconKey)) {
			descriptors.set(iconKey, {
				iconKey,
				categories,
				style,
				solidColor
			});
		}
	}

	return [...descriptors.values()];
}

type SummaryLevel = WardSummaryFeatureProperties['summaryType'];

function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value));
}

function getBoundingBoxAreaM2(summary: WardSummaryFeatureProperties): number {
	const centerLatRadians = ((summary.minLat + summary.maxLat) / 2) * Math.PI / 180;
	const metersPerDegreeLongitude = METERS_PER_DEGREE_LATITUDE * Math.cos(centerLatRadians);
	const widthM = Math.max(0, summary.maxLng - summary.minLng) * metersPerDegreeLongitude;
	const heightM = Math.max(0, summary.maxLat - summary.minLat) * METERS_PER_DEGREE_LATITUDE;

	return widthM * heightM;
}

function median(values: number[]): number | null {
	if (values.length === 0) return null;

	const sorted = [...values].sort((a, b) => a - b);
	const midpoint = Math.floor(sorted.length / 2);

	return sorted.length % 2 === 0
		? (sorted[midpoint - 1] + sorted[midpoint]) / 2
		: sorted[midpoint];
}

function buildSummaryMap(facilities: GeoFeature[], level: SummaryLevel): Map<string, WardSummaryFeatureProperties> {
	const summaries = new Map<string, WardSummaryFeatureProperties>();

	for (const facility of facilities) {
		if (!isFiniteCoordinatePair(facility.geometry.coordinates)) continue;
		const [lng, lat] = facility.geometry.coordinates;
		const { city, cityLabel, prefecture } = facility.properties;
		const key = level === 'prefecture' ? prefecture : city;
		const label = level === 'prefecture' ? prefecture : cityLabel;
		if (!key || !label) continue;
		const existing = summaries.get(key);

		if (existing) {
			existing.facilityCount += 1;
			existing.sumLng += lng;
			existing.sumLat += lat;
			existing.minLng = Math.min(existing.minLng, lng);
			existing.minLat = Math.min(existing.minLat, lat);
			existing.maxLng = Math.max(existing.maxLng, lng);
			existing.maxLat = Math.max(existing.maxLat, lat);
			continue;
		}

		summaries.set(key, {
			prefecture,
			city: key,
			cityLabel: label,
			summaryType: level,
			facilityCount: 1,
			clusterRadiusScale: 1,
			sumLng: lng,
			sumLat: lat,
			minLng: lng,
			minLat: lat,
			maxLng: lng,
			maxLat: lat
		});
	}

	return summaries;
}

function getMunicipalityReferenceAreaM2(facilities: GeoFeature[]): number {
	const municipalityAreas = [...buildSummaryMap(facilities, 'municipality').values()]
		.map(getBoundingBoxAreaM2)
		.filter((areaM2) => areaM2 > 0);

	return median(municipalityAreas) ?? FALLBACK_MUNICIPALITY_AREA_M2;
}

function getPrefectureClusterRadiusScale(summary: WardSummaryFeatureProperties, referenceAreaM2: number): number {
	const areaM2 = getBoundingBoxAreaM2(summary);
	if (areaM2 <= 0) return 1;

	const areaRadiusRatio = Math.sqrt(areaM2 / referenceAreaM2);
	const zoomPixelRatio = 2 ** (CLUSTER_WIDE_AREA_ZOOM - CLUSTER_WARD_AREA_ZOOM);
	const displayedRadiusRatio = CLUSTER_WARD_AREA_RADIUS_PX / CLUSTER_WIDE_AREA_RADIUS_PX;

	// Display radius is proportional to sqrt(area) * 2^zoom.
	return clamp(
		areaRadiusRatio * zoomPixelRatio * displayedRadiusRatio,
		PREFECTURE_CLUSTER_MIN_RADIUS_SCALE,
		PREFECTURE_CLUSTER_MAX_RADIUS_SCALE
	);
}

export function buildWardSummaryFeatureCollection(
	facilities: GeoFeature[],
	level: SummaryLevel = 'municipality'
): FeatureCollection<Point, WardSummaryFeatureProperties> {
	const summaries = buildSummaryMap(facilities, level);

	if (level === 'prefecture') {
		const referenceAreaM2 = getMunicipalityReferenceAreaM2(facilities);
		for (const summary of summaries.values()) {
			summary.clusterRadiusScale = getPrefectureClusterRadiusScale(summary, referenceAreaM2);
		}
	}

	return {
		type: 'FeatureCollection',
		features: [...summaries.values()].map((summary) => ({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [
					summary.sumLng / summary.facilityCount,
					summary.sumLat / summary.facilityCount
				]
			},
			properties: summary
		}))
	};
}

export function buildJapanWideSummaryFeatureCollection(
	facilities: GeoFeature[]
): FeatureCollection<Point, JapanWideSummaryFeatureProperties> {
	const validFacilities = facilities.filter((facility) =>
		isFiniteCoordinatePair(facility.geometry.coordinates)
	);

	if (validFacilities.length === 0) {
		return { type: 'FeatureCollection', features: [] };
	}

	let sumLng = 0;
	let sumLat = 0;

	for (const facility of validFacilities) {
		const [lng, lat] = facility.geometry.coordinates;
		sumLng += lng;
		sumLat += lat;
	}

	return {
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [sumLng / validFacilities.length, sumLat / validFacilities.length]
				},
				properties: {
					label: '日本',
					cityLabel: '日本',
					facilityCount: validFacilities.length
				}
			}
		]
	};
}

export function panToFacility(
	map: maplibregl.Map,
	facility: GeoFeature,
	isMobile: boolean,
	options?: { zoom?: number; duration?: number }
): void {
	const [lng, lat] = facility.geometry.coordinates;
	const duration = options?.duration ?? 300;

	if (isMobile) {
		const offset = window.innerHeight * 0.25;
		map.easeTo({
			center: [lng, lat],
			zoom: options?.zoom,
			offset: [0, -offset],
			duration
		});
		return;
	}

	if (options?.zoom !== undefined) {
		map.flyTo({ center: [lng, lat], zoom: options.zoom });
	}
}

export function fitToWardSummary(
	map: maplibregl.Map,
	summary: WardSummaryFeatureProperties,
	isMobile: boolean
): void {
	if (summary.city === 'japan') {
		const center: [number, number] = summary.facilityCount > 0
			? [summary.sumLng / summary.facilityCount, summary.sumLat / summary.facilityCount]
			: [
				(summary.minLng + summary.maxLng) / 2,
				(summary.minLat + summary.maxLat) / 2
			];

		map.easeTo({
			center,
			zoom: PREFECTURE_CLICK_ZOOM,
			offset: isMobile ? [0, -window.innerHeight * 0.2] : [0, 0],
			duration: 500
		});
		return;
	}

	if (summary.summaryType === 'prefecture') {
		const focusBounds = [
			summary.focusMinLng,
			summary.focusMinLat,
			summary.focusMaxLng,
			summary.focusMaxLat
		];
		const [minLng, minLat, maxLng, maxLat] = focusBounds.every((value) => Number.isFinite(value))
			? focusBounds as [number, number, number, number]
			: [summary.minLng, summary.minLat, summary.maxLng, summary.maxLat];
		const bounds: [[number, number], [number, number]] = [
			[minLng, minLat],
			[maxLng, maxLat]
		];
		map.fitBounds(bounds, {
			padding: isMobile ? 60 : 80,
			offset: isMobile ? [0, -window.innerHeight * 0.2] : [0, 0],
			duration: 500
		});
		return;
	}

	const center: [number, number] = summary.facilityCount > 0
		? [summary.sumLng / summary.facilityCount, summary.sumLat / summary.facilityCount]
		: [
			(summary.minLng + summary.maxLng) / 2,
			(summary.minLat + summary.maxLat) / 2
		];

	map.easeTo({
		center,
		zoom: WARD_SUMMARY_CLICK_ZOOM,
		offset: isMobile ? [0, -window.innerHeight * 0.2] : [0, 0],
		duration: 500
	});
}
