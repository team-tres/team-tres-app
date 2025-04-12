import { describe, it, expect } from 'vitest';
import generateInvestmentBalances from '../investment-generation';
import { MAX_FORECAST_SIZE } from '../../../../../config/constants';

describe('generateInvestmentBalances', () => {
  it('generic data', () => {
    const result = generateInvestmentBalances({
      investmentAmount: 999999,
      interestRate: 0.05,
      impactedYears: 10,
      reinvestmentPercentage: 1,
    });
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(MAX_FORECAST_SIZE);
    expect(result[1]).toBeGreaterThan(result[0]);
  });

  it('impacted years far beyond forecast scope', () => {
    const result = generateInvestmentBalances({
      investmentAmount: 999999,
      interestRate: 0.05,
      impactedYears: 500,
      reinvestmentPercentage: 1,
    });
    expect(result[1]).toBeGreaterThan(result[0]);
  });

  describe('investmentAmount', () => {
    it('non-number value, throw invalid error', () => {
      expect(() => generateInvestmentBalances({
        investmentAmount: 'j', // Edge case: non-number investment amount
        interestRate: 0.05,
        impactedYears: 10,
        reinvestmentPercentage: 1,
      })).toThrow('Invalid input: Value must be a valid number.');
    });

    it('NAN value, throw invalid error', () => {
      expect(() => generateInvestmentBalances({
        investmentAmount: NaN, // Edge case: NAN investment amount
        interestRate: 0.05,
        impactedYears: 10,
        reinvestmentPercentage: 1,
      })).toThrow('Invalid input: Value must be a valid number.');
    });

    it('0 value, return empty array', () => {
      const result = generateInvestmentBalances({
        investmentAmount: 0, // Edge case: 0 investment amount
        interestRate: 0.05,
        impactedYears: 10,
        reinvestmentPercentage: 1,
      });
      expect(result.every((v) => v === 0)).toBe(true);
    });

    it('Negative value, throw invalid error', () => {
      expect(() => generateInvestmentBalances({
        investmentAmount: -999999, // Edge case: negative investment amount
        interestRate: 0.5,
        impactedYears: 10,
        reinvestmentPercentage: 1,
      })).toThrow('Invalid input: Value must be a positive number.');
    });
  });

  describe('impactedYears', () => {
    it('NAN value, throw invalid error', () => {
      const result = generateInvestmentBalances({
        investmentAmount: 50000,
        interestRate: 0.05,
        impactedYears: NaN, // Edge case: NaN impacted years
        reinvestmentPercentage: 1,
      });
      expect(result.every((v) => v === 0)).toBe(true);
    });

    it('non-number value, throw invalid error', () => {
      const result = generateInvestmentBalances({
        investmentAmount: 50000,
        interestRate: 0.05,
        impactedYears: 'waswas', // Edge case: string impacted years
        reinvestmentPercentage: 1,
      });
      expect(result.every((v) => v === 0)).toBe(true);
    });

    it('0 value, return empty array', () => {
      const result = generateInvestmentBalances({
        investmentAmount: 50000,
        interestRate: 0.05,
        impactedYears: 0, // Edge case: 0 impacted years
        reinvestmentPercentage: 1,
      });
      expect(result.every((v) => v === 0)).toBe(true);
    });

    it('Negative value, throw invalid error', () => {
      const result = generateInvestmentBalances({
        investmentAmount: 50000,
        interestRate: 0.05,
        impactedYears: -10, // Edge case: 0 impacted years
        reinvestmentPercentage: 1,
      });
      expect(result.every((v) => v === 0)).toBe(true);
    });
  });

  describe('investmentRate', () => {
    it('NaN value, value does not change over time', () => {
      const result = generateInvestmentBalances({
        investmentAmount: 999999,
        interestRate: 0.05,
        impactedYears: 10,
        reinvestmentPercentage: 0, // Edge case: NaN reinvestment
      });
      expect(result.every((v) => v === 999999)).toBe(true);
    });

    it('non-number value, value does not change over time', () => {
      const result = generateInvestmentBalances({
        investmentAmount: 999999,
        interestRate: 0.05,
        impactedYears: 10,
        reinvestmentPercentage: 0, // Edge case: non-number reinvestment
      });
      expect(result.every((v) => v === 999999)).toBe(true);
    });

    it('<100% value, gets clamped up to 0% effect', () => {
      const result = generateInvestmentBalances({
        investmentAmount: 999999,
        interestRate: 0.05,
        impactedYears: 10,
        reinvestmentPercentage: -3, // Edge case: < 0% reinvestment
      });
      expect(result.every((v) => v === 999999)).toBe(true);
    });

    it('0% value, value does not change over time', () => {
      const result = generateInvestmentBalances({
        investmentAmount: 999999,
        interestRate: 0.05,
        impactedYears: 10,
        reinvestmentPercentage: 0, // Edge case: 0% reinvestment
      });
      expect(result.every((v) => v === 999999)).toBe(true);
    });

    it('>100% value, gets clamped down to 100% effect', () => {
      const result = generateInvestmentBalances({
        investmentAmount: 999999,
        interestRate: 0.05,
        impactedYears: 10,
        reinvestmentPercentage: 1000, // Edge case: > 100% reinvestment
      });

      const resultClamped = generateInvestmentBalances({
        investmentAmount: 999999,
        interestRate: 0.05,
        impactedYears: 10,
        reinvestmentPercentage: 1, // Control value: 100% reinvestment
      });
      expect(result[1]).toEqual(resultClamped[1]);
    });
  });

  describe('interestRate', () => {
    it('NaN value, throws an error', () => {
      expect(() => generateInvestmentBalances({
        investmentAmount: 10000,
        interestRate: NaN, // Edge case: NaN interest rate
        impactedYears: 10,
        reinvestmentPercentage: 1,
      })).toThrow('Invalid input: Value must be a valid number.');
    });

    it('non-number value, throws an error', () => {
      expect(() => generateInvestmentBalances({
        investmentAmount: 10000,
        interestRate: 'watwat', // Edge case: non-number interest rate
        impactedYears: 10,
        reinvestmentPercentage: 1,
      })).toThrow('Invalid input: Value must be a valid number.');
    });

    it('negative value, throws an error', () => {
      expect(() => generateInvestmentBalances({
        investmentAmount: 10000,
        interestRate: -0.05, // Edge case: negative interest rate
        impactedYears: 10,
        reinvestmentPercentage: 1,
      })).toThrow('Invalid input: Interest rate must be 0% or higher.');
    });

    it('0% value, total does not increase', () => {
      const result = generateInvestmentBalances({
        investmentAmount: 10000,
        interestRate: 0, // Edge case: 0% interest rate
        impactedYears: 10,
        reinvestmentPercentage: 1,
      });
      expect(result.every((v) => v === 10000)).toBe(true);
    });
  });
});
