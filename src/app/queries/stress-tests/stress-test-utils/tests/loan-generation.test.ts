import { describe, it, expect } from 'vitest';
import generateLoanBalances from '../loan-generation';
import { MAX_FORECAST_SIZE } from '../../../../../config/constants';

describe('generateLoanBalances', () => {
  it('generic data', () => {
    const result = generateLoanBalances(
      5000,
      0.06,
      24,
    );
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(MAX_FORECAST_SIZE);
    expect(result[1]).toBeLessThan(result[0]);
  });

  it('loan period far beyond forecast scope', () => {
    const result = generateLoanBalances(
      999999,
      0.05,
      500,
    );
    expect(result[1]).toBeGreaterThan(result[0]);
  });

  describe('loanAmount', () => {
    it('non-number value, throw invalid error', () => {
      expect(() => generateLoanBalances(
        'j', // Edge case: non-number loan amount
        0.05,
        10,
      )).toThrow('Invalid input: Value must be a valid number.');
    });

    it('NAN value, throw invalid error', () => {
      expect(() => generateLoanBalances(
        NaN, // Edge case: NAN loan amount
        0.05,
        10,
      )).toThrow('Invalid input: Value must be a valid number.');
    });

    it('0 value, return empty array', () => {
      const result = generateLoanBalances(
        0, // Edge case: 0 loan amount
        0.05,
        10,
      );
      expect(result.every((v) => v === 0)).toBe(true);
    });

    it('Negative value, throw invalid error', () => {
      expect(() => generateLoanBalances(
        -999999, // Edge case: negative loan amount
        0.5,
        10,
      )).toThrow('Invalid input: Value must be a positive number.');
    });
  });

  describe('loanPeriod', () => {
    it('NAN value, throw invalid error', () => {
      expect(() => generateLoanBalances(
        50000,
        0.05,
        NaN, // Edge case: NaN loan period
      )).toThrow();
    });

    it('non-number value, throw invalid error', () => {
      expect(() => generateLoanBalances(
        50000,
        0.05,
        'waswas', // Edge case: string loan period
      )).toThrow('Invalid input: Value must be a valid number.');
    });

    it('0 value, return empty array', () => {
      const result = generateLoanBalances(
        50000,
        0.05,
        0, // Edge case: 0 loan period
      );
      expect(result.every((v) => v === 0)).toBe(true);
    });

    it('Negative value, throw invalid error', () => {
      expect(() => generateLoanBalances(
        50000,
        0.05,
        -10, // Edge case: 0 loan period
      )).toThrow('Invalid input: Value must be a positive number.');
    });
  });

  describe('interestRate', () => {
    it('NaN value, throws an error', () => {
      expect(() => generateLoanBalances(
        10000,
        NaN, // Edge case: NaN interest rate
        10,
      )).toThrow('Invalid input: Value must be a valid number.');
    });

    it('non-number value, throws an error', () => {
      expect(() => generateLoanBalances(
        10000,
        'watwat', // Edge case: non-number interest rate
        10,
      )).toThrow('Invalid input: Value must be a valid number.');
    });

    it('negative value, throws an error', () => {
      expect(() => generateLoanBalances(
        10000,
        -0.05, // Edge case: negative interest rate
        10,

      )).toThrow('Interest rate must be 0% or higher.');
    });

    it('0% value, total does not increase', () => {
      const result = generateLoanBalances(
        10000,
        0, // Edge case: 0% interest rate
        10,
      );
      const result2 = generateLoanBalances(
        10000,
        0.1, // Edge case: 0% interest rate
        10,
      );
      expect(result[4]).toBeLessThan(result2[4]);
    });
  });
});
