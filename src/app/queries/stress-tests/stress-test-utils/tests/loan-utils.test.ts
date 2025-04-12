import { describe, it, expect } from 'vitest';
import { calculateLoan } from '../loan-utils';
import { MAX_FORECAST_SIZE } from '../../../../../config/constants';

describe('calculateLoan', () => {
  it('generic data', () => {
    const result = calculateLoan({
      loanAmount: 5000,
      interestRate: 0.06,
      loanPeriod: 24,
    });
    expect(result.interestPerPayment).toBeInstanceOf(Array);
    expect(result.interestPerPayment).toHaveLength(MAX_FORECAST_SIZE);
    expect(result.interestPerPayment[0]).toBeGreaterThan(result.interestPerPayment[1]);
  });

  it('loan period far beyond forecast scope', () => {
    const result = calculateLoan({
      loanAmount: 999999,
      interestRate: 0.05,
      loanPeriod: 500,
    });
    expect(result.interestPerPayment[0]).toBeGreaterThan(result.interestPerPayment[1]);
  });

  describe('loanAmount', () => {
    it('non-number value, throw invalid error', () => {
      expect(() => calculateLoan({
        loanAmount: 'j', // Edge case: non-number loan amount
        interestRate: 0.05,
        loanPeriod: 10,
      })).toThrow('Invalid input: Value must be a valid number.');
    });

    it('NAN value, throw invalid error', () => {
      expect(() => calculateLoan({
        loanAmount: NaN, // Edge case: NAN loan amount
        interestRate: 0.05,
        loanPeriod: 10,
      })).toThrow('Invalid input: Value must be a valid number.');
    });

    it('0 value, return empty array', () => {
      const result = calculateLoan({
        loanAmount: 0, // Edge case: 0 loan amount
        interestRate: 0.05,
        loanPeriod: 10,
      });
      expect(result.interestPerPayment.every((v) => v === 0)).toBe(true);// MUSTCHANGE
    });

    it('Negative value, throw invalid error', () => {
      expect(() => calculateLoan({
        loanAmount: -999999, // Edge case: negative loan amount
        interestRate: 0.5,
        loanPeriod: 10,
      })).toThrow('Invalid input: Value must be a positive number.');
    });
  });

  describe('loanPeriod', () => {
    it('NAN value, throw invalid error', () => {
      expect(() => calculateLoan({
        loanAmount: 50000,
        interestRate: 0.05,
        loanPeriod: NaN, // Edge case: NaN loan period
      })).toThrow('Invalid input: Value must be a valid number.');
    });

    it('non-number value, throw invalid error', () => {
      expect(() => calculateLoan({
        loanAmount: 50000,
        interestRate: 0.05,
        loanPeriod: 'waswas', // Edge case: string loan period
      })).toThrow('Invalid input: Value must be a valid number.');
    });

    it('0 value, return empty array', () => {
      const result = calculateLoan({
        loanAmount: 50000,
        interestRate: 0.05,
        loanPeriod: 0, // Edge case: 0 loan period
      });
      expect(result.interestPerPayment.every((v) => v === 0)).toBe(true);
    });

    it('Negative value, throw invalid error', () => {
      expect(() => calculateLoan({
        loanAmount: 50000,
        interestRate: 0.05,
        loanPeriod: -10, // Edge case: 0 loan period
      })).toThrow('Invalid input: Value must be a positive number.');
    });
  });

  describe('interestRate', () => {
    it('NaN value, throws an error', () => {
      expect(() => calculateLoan({
        loanAmount: 10000,
        interestRate: NaN, // Edge case: NaN interest rate
        loanPeriod: 10,
      })).toThrow('Invalid input: Value must be a valid number.');
    });

    it('non-number value, throws an error', () => {
      expect(() => calculateLoan({
        loanAmount: 10000,
        interestRate: 'watwat', // Edge case: non-number interest rate
        loanPeriod: 10,
      })).toThrow('Invalid input: Value must be a valid number.');
    });

    it('negative value, throws an error', () => {
      expect(() => calculateLoan({
        loanAmount: 10000,
        interestRate: -0.05, // Edge case: negative interest rate
        loanPeriod: 10,

      })).toThrow('Invalid input: Interest rate must be 0% or higher.');
    });

    it('0% value, total does not increase', () => {
      const result = calculateLoan({
        loanAmount: 10000,
        interestRate: 0, // Edge case: 0% interest rate
        loanPeriod: 10,
      });
      const result2 = calculateLoan({
        loanAmount: 10000,
        interestRate: 0.1,
        loanPeriod: 10,
      });
      expect(result.interestPerPayment[4]).toBeLessThan(result2.interestPerPayment[4]);// MUSTCHANGE
    });
  });
});
