import { describe, it, expect } from 'vitest';
import calculateResidualEffects from '../stress-test-utils/residual-effects';

describe('calculateResidualEffects', () => {
  it('calculates positive residual effects', () => {
    const result = calculateResidualEffects({ principals: [1000, 1000] });
    expect(result[1]).toBeGreaterThan(result[0]);
  });
});