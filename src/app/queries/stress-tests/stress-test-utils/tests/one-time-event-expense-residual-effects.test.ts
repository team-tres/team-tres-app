import { describe, it, expect } from 'vitest';
import calculateResidualEffects3 from '../one-time-event-expense-residual-effects';
import { CURRENT_YEAR, MAX_FORECAST_SIZE } from '../../../../../config/constants';

describe('calculateResidualEffects3', () => {
  it('generic data', () => {
    const result = calculateResidualEffects3({
      expense: 5000,
      eventYear: 2026,
    });
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(MAX_FORECAST_SIZE);
    expect(result[0]).toBeLessThan(result[1]);
  });
  describe('expense', () => {
    it('NaN value, throws an error', () => {
      expect(() => calculateResidualEffects3({
        expense: NaN, // Edge case: NaN expense
        eventYear: 2025,
      })).toThrow('Invalid input: Value must be a valid number.');
    });

    it('non-number value, throws an error', () => {
      expect(() => calculateResidualEffects3({
        expense: 'waswas', // Edge case: non-number expense
        eventYear: 2025,
      })).toThrow('Invalid input: Value must be a valid number.');
    });

    it('negative value, throws an error', () => {
      expect(() => calculateResidualEffects3({
        expense: -5000, // Edge case: negative expense
        eventYear: 2025,
      })).toThrow('Invalid input: Value must be a positive number.');
    });

    it('0 expense, returns all zeroes', () => {
      const result = calculateResidualEffects3({
        expense: 0, // Edge case: 0 expense
        eventYear: 2025,
      });
      expect(result[0]).toEqual(0);
      expect(result[11]).toEqual(0);
      expect(result.every(val => val === 0)).toBe(true);
    });
  });

  describe('eventYear', () => {
    it('NaN value, throws an error', () => {
      expect(() => calculateResidualEffects3({
        expense: 10000,
        eventYear: NaN, // Edge case: NaN eventYear
      })).toThrow();
    });

    it('non-number value, throws an error', () => {
      expect(() => calculateResidualEffects3({
        expense: 10000,
        eventYear: 'awsaws', // Edge case: non-number eventYear
      })).toThrow();
    });

    it('year at forecast limit, doesnt calculate till last year', () => {
      const maxForecastYear = CURRENT_YEAR + MAX_FORECAST_SIZE - 1;
      const result = calculateResidualEffects3({
        expense: 10000,
        eventYear: maxForecastYear, // Edge case: year at forecast limit
      });
      expect(result[MAX_FORECAST_SIZE - 2]).toEqual(0);
      expect(result[MAX_FORECAST_SIZE - 2]).toBeLessThan(result[MAX_FORECAST_SIZE - 1]);
    });

    it('year after forecast, returns all zeroes', () => {
      const maxForecastYear = CURRENT_YEAR + MAX_FORECAST_SIZE;
      const result = calculateResidualEffects3({
        expense: 10000,
        eventYear: maxForecastYear + 1, // Edge case: one year after forecast
      });
      expect(result.every(val => val === 0)).toBe(true);
    });
  });
});
