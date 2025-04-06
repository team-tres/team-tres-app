import { describe, it, expect } from 'vitest';
import performStressTest from '../stress-test-5';

describe('Stress Test 5 - Edge Cases', () => {
  it('handles 0 loan amount', () => {
    const result = performStressTest(0, 10, 0.06, 0.03);
    expect(result.stressEffects.every(v => v === 0)).toBe(true);
  });

  it('handles 0% interest rates', () => {
    const result = performStressTest(10000, 10, 0, 0);
    expect(result.stressEffects.every(v => typeof v === 'number')).toBe(true);
  });

  it('handles negative interest (should behave consistently)', () => {
    const result = performStressTest(10000, 10, -0.01, -0.02);
    expect(result.stressEffects.length).toBeGreaterThan(0);
  });

  it('handles very large loan period', () => {
    const result = performStressTest(10000, 100, 0.06, 0.03);
    expect(Array.isArray(result.stressEffects)).toBe(true);
  });
});
