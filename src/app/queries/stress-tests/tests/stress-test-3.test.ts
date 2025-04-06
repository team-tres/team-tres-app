import { describe, it, expect } from 'vitest';
import CalculateStressTest3 from '../stress-test-3';

describe('Stress Test 3 - Edge Cases', () => {
  it('handles event in current year', () => {
    const currentYear = new Date().getFullYear();
    const data = { expense: 50000, eventYear: currentYear };
    const result = CalculateStressTest3(data);
    expect(result.stressEffects[currentYear - currentYear]).toBe(50000);
  });

  it('handles future year beyond max', () => {
    const data = { expense: 50000, eventYear: 9999 };
    const result = CalculateStressTest3(data);
    expect(result.stressEffects.every(v => v === 0)).toBe(true);
  });

  it('handles 0 expense', () => {
    const currentYear = new Date().getFullYear();
    const data = { expense: 0, eventYear: currentYear };
    const result = CalculateStressTest3(data);
    expect(result.stressEffects[currentYear - currentYear]).toBe(0);
  });
});
