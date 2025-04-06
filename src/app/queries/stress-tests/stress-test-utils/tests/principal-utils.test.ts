import { describe, it, expect } from 'vitest';
import calculatePrincipal from '../principal-utils';

describe('calculatePrincipal', () => {
  it('calculates correct difference between balances', () => {
    const result = calculatePrincipal([100, 90], [80, 70]);
    expect(result).toEqual([20, 20]);
  });

  it('throws error on mismatched array lengths', () => {
    expect(() => calculatePrincipal([100], [80, 70])).toThrow();
  });
});