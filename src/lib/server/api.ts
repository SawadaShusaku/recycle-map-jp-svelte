import { json } from '@sveltejs/kit';

const MAX_CSV_PARAM_ITEMS = 50;
const MAX_CSV_PARAM_ITEM_LENGTH = 80;

export function jsonError(message: string, status = 500): Response {
	return json({ error: message }, { status });
}

export function readCsvParam(url: URL, name: string): string[] {
	return (url.searchParams.get(name) ?? '')
		.split(',')
		.map((value) => value.trim())
		.filter((value) => value.length > 0 && value.length <= MAX_CSV_PARAM_ITEM_LENGTH)
		.slice(0, MAX_CSV_PARAM_ITEMS);
}

export function readSearchParam(url: URL, name: string, maxLength = 120): string {
	return (url.searchParams.get(name)?.trim() ?? '').slice(0, maxLength);
}
