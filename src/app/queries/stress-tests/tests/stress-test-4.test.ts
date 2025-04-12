import { describe, it, expect } from 'vitest';
import calculateStressTest4 from '../stress-test-4';
import { MAX_FORECAST_SIZE } from '../../../../config/constants';

describe('Stress Test 4 - Edge Cases', () => {
  it('generic data', () => {
    const data = {
      expensesByYear: [52589, 52564, 52930, 52694, 52729, 52785, 52736, 52750, 52757, 52748, 52752, 52752],
      increasePercentage: 0.025,
    };
    const result = calculateStressTest4(data);
    expect(result.stressEffects).toBeInstanceOf(Array);
    expect(result.stressEffects).toHaveLength(MAX_FORECAST_SIZE);
    expect(result.residualEffects).toBeInstanceOf(Array);
    expect(result.residualEffects).toHaveLength(MAX_FORECAST_SIZE);

    expect(result.stressEffects[0]).toBeCloseTo(1315, 0);
    expect(result.stressEffects[11]).toBeCloseTo(1319, 0);
    expect(result.residualEffects[0]).toBeCloseTo(79, 0);
    expect(result.residualEffects[11]).toBeCloseTo(7783, 0);
  });

  describe('Expenses', () => {
    it('empty expenses array, returns array filled with zeroes', () => {
      const data = {
        expensesByYear: [],
        increasePercentage: 0.025,
      };
      const result = calculateStressTest4(data);
      expect(result.stressEffects.every(v => v === 0)).toBe(true);
    });

    it('array smaller than forecast, throws error', () => {
      const arr = new Array(MAX_FORECAST_SIZE - 1).fill(Math.random());
      const data = {
        expensesByYear: arr, // Edge case: array smaller than forecast
        increasePercentage: 0.025,
      };
      expect(() => calculateStressTest4(data)).toThrow('Invalid input: Array should contain at least 12 elements.');
    });

    it('NaN value in array, throws error', () => {
      const data = {
        expensesByYear: [
          52589,
          NaN, // Edge case: NaN expense
          52930,
          52694,
          52729,
          52785,
          52736,
          52750,
          52757,
          52748,
          52752,
          52752,
        ],
        increasePercentage: 0.025,
      };
      expect(() => calculateStressTest4(data)).toThrow('Invalid input: Array contains a non-number value.');
    });

    it('non-number value in array, throws error', () => {
      const data = {
        expensesByYear: [
          52589,
          52564,
          52930,
          52694,
          'wsaw', // Edge case: non-number expense
          52785,
          52736,
          52750,
          52757,
          52748,
          52752,
          52752,
        ],
        increasePercentage: 0.025,
      };
      expect(() => calculateStressTest4(data)).toThrow('Invalid input: Array contains a non-number value.');
    });

    it('negative value in array, throws error', () => {
      const data = {
        expensesByYear: [
          52589,
          52564,
          52930,
          52694,
          52729,
          52785,
          -52736, // Edge case: negative expense
          52750,
          52757,
          52748,
          52752,
          52752,
        ],
        increasePercentage: 0.025,
      };
      expect(() => calculateStressTest4(data)).toThrow('Invalid input: Array should only contain positive values.');
    });
  });

  describe('Expense Increase', () => {
    it('NaN expense increase, throws error', () => {
      const data = {
        expensesByYear: [52589, 52564, 52930, 52694, 52729, 52785, 52736, 52750, 52757, 52748, 52752, 52752],
        increasePercentage: NaN, // Edge case: NaN increase
      };
      expect(() => calculateStressTest4(data)).toThrow('Invalid input: Value must be a valid number.');
    });

    it('non-number expense increase, throws error', () => {
      const data = {
        expensesByYear: [52589, 52564, 52930, 52694, 52729, 52785, 52736, 52750, 52757, 52748, 52752, 52752],
        increasePercentage: 'twat', // Edge case: non-number increase
      };
      expect(() => calculateStressTest4(data)).toThrow('Invalid input: Value must be a valid number.');
    });

    it('negative expense increase, throws error', () => {
      const data = {
        expensesByYear: [52589, 52564, 52930, 52694, 52729, 52785, 52736, 52750, 52757, 52748, 52752, 52752],
        increasePercentage: -1, // Edge case: negative increase
      };
      expect(() => calculateStressTest4(data)).toThrow('Invalid input: Value must be a positive number.');
    });

    it('0% increase in expenses, returns an array filled with zeroes', () => {
      const data = {
        expensesByYear: [52589, 52564, 52930, 52694, 52729, 52785, 52736, 52750, 52757, 52748, 52752, 52752],
        increasePercentage: 0, // Edge case: 0% increase
      };
      const result = calculateStressTest4(data);
      expect(result.stressEffects.every(v => v === 0)).toBe(true);
    });
  });
});
