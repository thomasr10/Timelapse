// src/utils/__tests__/formatUsername.test.ts
import { describe, it, expect } from 'vitest';
import { formatUsername } from '../formatText';

describe('formatUsername', () => {
    it('returns undefined for undefined input', () => {
        expect(formatUsername(undefined)).toBeUndefined();
    });

    it('prefixes the username with @', () => {
        expect(formatUsername('thomas')).toBe('@thomas');
    });
});