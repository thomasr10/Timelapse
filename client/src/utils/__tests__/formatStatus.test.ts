// src/utils/__tests__/formatStatus.test.ts
import { describe, it, expect } from 'vitest';
import { formatStatus } from '../formatStatus';

describe('formatStatus', () => {
    it('returns N/A for undefined', () => {
        expect(formatStatus(undefined)).toBe('N/A');
    });

    it('translates Returning Series', () => {
        expect(formatStatus('Returning Series')).toBe('En cours');
    });

    it('translates Ended', () => {
        expect(formatStatus('Ended')).toBe('Terminée');
    });

    it('translates Canceled', () => {
        expect(formatStatus('Canceled')).toBe('Annulée');
    });
});