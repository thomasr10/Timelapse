// src/utils/__tests__/formatTmdbRate.test.ts
import { describe, it, expect } from 'vitest';
import { formatTmdbRate, getStarType } from '../formatRate';

describe('formatTmdbRate', () => {
    it('returns N/A for null, undefined, or 0', () => {
        expect(formatTmdbRate(null)).toBe('N/A');
        expect(formatTmdbRate(undefined)).toBe('N/A');
        expect(formatTmdbRate(0)).toBe('N/A');
    });

    it('divides the rate by 2 and formats with 1 decimal', () => {
        expect(formatTmdbRate(9.2)).toBe('4.6');
    });
});

describe('getStarType', () => {
    it('returns empty when value is null or undefined', () => {
        expect(getStarType(1, null)).toBe('empty');
        expect(getStarType(1, undefined)).toBe('empty');
    });

    it('returns full when value >= index', () => {
        expect(getStarType(2, 3)).toBe('full');
    });

    it('returns half when value is index - 0.5', () => {
        expect(getStarType(3, 2.5)).toBe('half');
    });

    it('returns empty when value < index - 0.5', () => {
        expect(getStarType(3, 1.5)).toBe('empty');
    });
});