// src/utils/__tests__/formatCurrency.test.ts
import { describe, it, expect } from 'vitest';
import { formatCurrency } from '../formatCurrency';

describe('formatCurrency', () => {
    it('returns N/A for undefined', () => {
        expect(formatCurrency(undefined)).toBe('N/A');
    });

    it('returns N/A for 0', () => {
        expect(formatCurrency(0)).toBe('N/A');
    });

    it('formats a positive number as USD currency', () => {
        const result = formatCurrency(1150000);
        expect(result).toContain('1');
        expect(result).toContain('150');
        expect(result).toContain('000');
        expect(result).toContain('$US');
    });
});