import { describe, it, expect } from 'vitest';
import calculateStressTest1, { StressData } from '../stress-test-1';

describe('Stress Test 1 - Edge Cases', () => {
  it('handles zero investment gracefully', () => {
    const data: StressData = {
      investmentAmount: 0,
      interestRate: 0.06,
      interestRateDrop: 0.3,
      impactedYears: 10,
      reinvestmentPercentage: 1,
    };

    const result = calculateStressTest1(data);
    expect(result.stressEffects.every(v => v === 0)).toBe(true);
    expect(result.residualEffects.every(v => v === 0)).toBe(true);
  });

  it('handles 0% interest rate', () => {
    const data: StressData = {
      investmentAmount: 10000,
      interestRate: 0,
      interestRateDrop: 0.3,
      impactedYears: 10,
      reinvestmentPercentage: 1,
    };

    const result = calculateStressTest1(data);
    expect(result.stressEffects.every(v => v === 0)).toBe(true);
  });

  it('handles full interest rate drop (100%)', () => {
    const data: StressData = {
      investmentAmount: 10000,
      interestRate: 0.06,
      interestRateDrop: 1,
      impactedYears: 10,
      reinvestmentPercentage: 1,
    };

    const result = calculateStressTest1(data);
    expect(result.stressEffects).toBeInstanceOf(Array);
    expect(result.stressEffects.every(v => typeof v === 'number')).toBe(true);
  });

  it('ignores reinvestmentPercentage for now (unimplemented)', () => {
    const data: StressData = {
      investmentAmount: 10000,
      interestRate: 0.06,
      interestRateDrop: 0.3,
      impactedYears: 10,
      reinvestmentPercentage: 0,
    };

    const result = calculateStressTest1(data);
    expect(result.stressEffects.length).toBeGreaterThan(0);
  });
});
