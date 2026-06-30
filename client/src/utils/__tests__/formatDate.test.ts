// src/utils/__tests__/formatDate.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate, localFormatDate, formatReviewDate } from '../formatDate';

describe('formatDate', () => {
    it('returns undefined for undefined input', () => {
        expect(formatDate(undefined)).toBeUndefined();
    });

    it('returns a Date object for a valid date string', () => {
        const result = formatDate('2024-03-01');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getFullYear()).toBe(2024);
    });
});

describe('localFormatDate', () => {
    it('returns undefined for undefined input', () => {
        expect(localFormatDate(undefined)).toBeUndefined();
    });

    it('formats a date in French long format', () => {
        expect(localFormatDate('2024-03-01')).toBe('1 mars 2024');
    });
});

describe('formatReviewDate', () => {
    it('returns undefined for undefined input', () => {
        expect(formatReviewDate(undefined)).toBeUndefined();
    });

    it('returns seconds for a very recent date', () => {
        const now = new Date().toISOString();
        expect(formatReviewDate(now)).toMatch(/\d+s/);
    });

    it('returns years for an old date', () => {
        const oldDate = new Date();
        oldDate.setFullYear(oldDate.getFullYear() - 2);
        expect(formatReviewDate(oldDate.toISOString())).toMatch(/\d+ a/);
    });
});