import { describe, it, expect } from 'vitest';
import calculateResidualEffects3 from '../residual-effects-3';

describe('calculateResidualEffects3', () => {
  it('returns all zeros if event is after forecast', () => {
    const result = calculateResidualEffects3({ expense: 10000, eventYear: 9999 });
    expect(result.every(val => val === 0)).toBe(true);
  });
});
