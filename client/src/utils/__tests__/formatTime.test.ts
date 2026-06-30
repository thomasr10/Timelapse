// src/utils/__tests__/formatTime.test.ts
import { describe, it, expect } from 'vitest';
import { formatTime } from '../formatTime';

describe('formatTime', () => {
    it('returns N/A for undefined', () => {
        expect(formatTime(undefined)).toBe('N/A');
    });

    it('returns hours only when minutes is 0', () => {
        expect(formatTime(120)).toBe('2h');
    });

    it('formats hours and minutes', () => {
        expect(formatTime(125)).toBe('2h 05min');
    });
});