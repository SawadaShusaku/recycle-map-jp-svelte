import { describe, expect, it } from 'vitest';
import { readCsvParam, readSearchParam } from '../api';

describe('API parameter readers', () => {
	it('keeps normal CSV values unchanged', () => {
		const url = new URL('https://example.test/api/facilities?wards=toshima,chiyoda&categories=dry-battery');

		expect(readCsvParam(url, 'wards')).toEqual(['toshima', 'chiyoda']);
		expect(readCsvParam(url, 'categories')).toEqual(['dry-battery']);
	});

	it('drops overlong CSV values and caps item count', () => {
		const values = Array.from({ length: 55 }, (_, index) => `ward-${index}`);
		values[3] = 'x'.repeat(81);
		const url = new URL(`https://example.test/api/facilities?wards=${values.join(',')}`);

		const result = readCsvParam(url, 'wards');

		expect(result).toHaveLength(50);
		expect(result).not.toContain(values[3]);
		expect(result[0]).toBe('ward-0');
	});

	it('caps search query length without changing normal queries', () => {
		const normal = new URL('https://example.test/api/facilities?q=図書館%20電池');
		const long = new URL(`https://example.test/api/facilities?q=${'a'.repeat(200)}`);

		expect(readSearchParam(normal, 'q')).toBe('図書館 電池');
		expect(readSearchParam(long, 'q')).toHaveLength(120);
	});
});
