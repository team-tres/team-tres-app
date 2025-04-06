import { describe, it, expect } from 'vitest';
import calculateStressTest4 from '../stress-test-4';

describe('Stress Test 4 - Edge Cases', () => {
  it('handles 0% increase in expenses', () => {
    const data = { increaseInExpenses: [1000, 2000], expenseIncreasePercentage: 0 };
    const result = calculateStressTest4(data);
    expect(result.stressEffects.every(v => v === 0)).toBe(true);
  });

  it('handles 100% increase in expenses', () => {
    const data = { increaseInExpenses: [1000, 2000], expenseIncreasePercentage: 1 };
    const result = calculateStressTest4(data);
    expect(result.stressEffects).toEqual([1000, 2000]);
  });

  it('handles empty expenses array', () => {
    const data = { increaseInExpenses: [], expenseIncreasePercentage: 0.5 };
    const result = calculateStressTest4(data);
    expect(result.stressEffects).toEqual([]);
  });
});
