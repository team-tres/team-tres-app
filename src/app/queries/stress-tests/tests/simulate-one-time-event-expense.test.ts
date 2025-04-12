import { describe, it, expect } from 'vitest';
import simulateOneTimeEventExpense from '../simulate-one-time-event-expense';
import { CURRENT_YEAR, MAX_FORECAST_SIZE } from '../../../../config/constants';

describe('Stress Test 3 - Edge Cases', () => {
  it('generic data', () => {
    const data = {
      expense: 999999,
      eventYear: 2028,
    };
    const result = simulateOneTimeEventExpense(data);
    expect(result.stressEffects).toBeInstanceOf(Array);
    expect(result.stressEffects).toHaveLength(MAX_FORECAST_SIZE);
    expect(result.residualEffects).toBeInstanceOf(Array);
    expect(result.residualEffects).toHaveLength(MAX_FORECAST_SIZE);
    expect(result.stressEffects[2028 - CURRENT_YEAR]).toBe(999999);
  });

  describe('Expense', () => {
    it('NaN expenses, throws error', () => {
      const data = {
        expense: NaN, // Edge case: NaN expenses
        eventYear: 2028,
      };
      expect(() => simulateOneTimeEventExpense(data))
        .toThrowError('Invalid input: Value must be a valid number.');
    });

    it('non-number expenses, throws error', () => {
      const data = {
        expense: 'wasra', // Edge case: non-number expenses
        eventYear: 2028,
      };
      expect(() => simulateOneTimeEventExpense(data))
        .toThrowError('Invalid input: Value must be a valid number.');
    });

    it('negative expenses, throws error', () => {
      const data = {
        expense: -999999, // Edge case: negative expenses
        eventYear: 2028,
      };
      expect(() => simulateOneTimeEventExpense(data))
        .toThrowError('Invalid input: Value must be a positive number.');
    });

    it('0 expenses, returns arrays filled with zeroes', () => {
      const data = {
        expense: 0, // Edge case: 0 expenses
        eventYear: 2028,
      };
      const result = simulateOneTimeEventExpense(data);
      expect(result.stressEffects).toBeInstanceOf(Array);
      expect(result.stressEffects).toHaveLength(MAX_FORECAST_SIZE);
      expect(result.residualEffects).toBeInstanceOf(Array);
      expect(result.residualEffects).toHaveLength(MAX_FORECAST_SIZE);
      expect(result.stressEffects.every((v) => v === 0)).toBe(true);
      expect(result.residualEffects.every((v) => v === 0)).toBe(true);
    });
  });

  describe('Event year', () => {
    it('NaN year, throws error', () => {
      const data = {
        expense: 999999, // Edge case: NaN year
        eventYear: NaN,
      };
      expect(() => simulateOneTimeEventExpense(data))
        .toThrowError('Invalid input: Value must be a valid number.');
    });

    it('non-number year, throws error', () => {
      const data = {
        expense: 999999, // Edge case: non-number year
        eventYear: 'wasra',
      };
      expect(() => simulateOneTimeEventExpense(data))
        .toThrowError('Invalid input: Value must be a valid number.');
    });

    it('negative year, throws error', () => {
      const data = {
        expense: 999999,
        eventYear: -8, // Edge case: negative year
      };
      expect(() => simulateOneTimeEventExpense(data))
        .toThrowError('Invalid input: Value must be a positive number.');
    });

    it('current year, returns valid arrays', () => {
      const currentYear = new Date().getFullYear();
      const data = {
        expense: 999999,
        eventYear: currentYear, // Edge case: current year
      };
      const result = simulateOneTimeEventExpense(data);
      expect(result.stressEffects).toBeInstanceOf(Array);
      expect(result.stressEffects).toHaveLength(MAX_FORECAST_SIZE);
      expect(result.residualEffects).toBeInstanceOf(Array);
      expect(result.residualEffects).toHaveLength(MAX_FORECAST_SIZE);
      expect(result.stressEffects[0]).toBe(999999);
      expect(result.residualEffects[0]).toBeLessThan(result.residualEffects[1]);
    });

    it('year before forecast, throws error', () => {
      const data = { expense: 999999, eventYear: 0 };
      expect(() => simulateOneTimeEventExpense(data))
        .toThrowError('Invalid input: Event year is before forecast range.');
    });

    it('year beyond forecast, returns arrays with 0', () => {
      const data = {
        expense: 999999,
        eventYear: 9999, // Edge case: beyond forecast range
      };
      const result = simulateOneTimeEventExpense(data);
      expect(result.stressEffects).toBeInstanceOf(Array);
      expect(result.stressEffects).toHaveLength(MAX_FORECAST_SIZE);
      expect(result.residualEffects).toBeInstanceOf(Array);
      expect(result.residualEffects).toHaveLength(MAX_FORECAST_SIZE);
      expect(result.stressEffects.every(v => v === 0)).toBe(true);
      expect(result.residualEffects.every(v => v === 0)).toBe(true);
    });
  });
});
