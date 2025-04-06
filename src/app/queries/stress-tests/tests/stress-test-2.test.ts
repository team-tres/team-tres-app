import { describe, it, expect } from 'vitest';
import CalculateStressTest2 from '../stress-test-2';

describe('Stress Test 2 - Edge Cases', () => {
  it('handles empty net sales', () => {
    const data = { netSales: [], investmentRate: 0.06, investmentRateDrop: 0.6 };
    const result = CalculateStressTest2(data);
    expect(result.stressEffects).toEqual([]);
    expect(result.residualEffects).toEqual([]);
  });

  it('handles 0% drop', () => {
    const data = { netSales: [100000, 120000], investmentRate: 0.06, investmentRateDrop: 0 };
    const result = CalculateStressTest2(data);
    expect(result.stressEffects.every(v => v === 0)).toBe(true);
  });

  it('handles 100% drop', () => {
    const data = { netSales: [100000, 120000], investmentRate: 0.06, investmentRateDrop: 1 };
    const result = CalculateStressTest2(data);
    expect(result.stressEffects.every(v => v > 0)).toBe(true);
  });
});
