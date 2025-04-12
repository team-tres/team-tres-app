import { describe, it, expect } from 'vitest';
import calculateInterestPayment from '../ipmt-utils';

describe('calculateInterestPayment', () => {
  it('generic monthly data', () => {
    const result = calculateInterestPayment(1000, 0.06, 'monthly');
    expect(result).toBeCloseTo(5, 1);
  });

  it('generic yearly data', () => {
    const result = calculateInterestPayment(1000, 0.06, 'yearly');
    expect(result).toBeCloseTo(60);
  });

  describe('loanAmount', () => {
    it('NaN value, throws an error', () => {
      expect(() => calculateInterestPayment(
        NaN,
        0.05,
      )).toThrow('Invalid input: Value must be a valid number.');
    });

    it('non-number value, throws an error', () => {
      expect(() => calculateInterestPayment(
        'wat',
        0.05,
      )).toThrow('Invalid input: Value must be a valid number.');
    });

    it('negative value, throws an error', () => {
      expect(() => calculateInterestPayment(
        -999999,
        0.05,
      )).toThrow('Invalid input: Value must be a positive number.');
    });

    it('0, return will be 0', () => {
      const result = calculateInterestPayment(0, 0.05);
      expect(result).toBe(0);
    });
  });

  describe('interest rate', () => {
    it('NaN value, throws an error', () => {
      expect(() => calculateInterestPayment(
        1000,
        NaN,
        'yearly',
      )).toThrow('Invalid input: Value must be a valid number.');
    });

    it('non-number value, throws an error', () => {
      expect(() => calculateInterestPayment(
        1000,
        'wftwft',
        'yearly',
      )).toThrow('Invalid input: Value must be a valid number.');
    });

    it('negative value, throws an error', () => {
      expect(() => calculateInterestPayment(
        1000,
        -0.05,
        'yearly',
      )).toThrow('Invalid input: Interest rate must be 0% or higher.');
    });

    it('0% interest rate, no interest payment', () => {
      const result = calculateInterestPayment(1000, 0);
      expect(result).toBe(0);
    });
  });

  describe('frequency edge cases', () => {
    it('no value, fall back to default', () => {
      const result = calculateInterestPayment(1000, 0.06);
      expect(result).toBeCloseTo(5, 1);
    });

    it('montly Capital Case, uses monthly', () => {
      const result = calculateInterestPayment(1000, 0.05, 'MONTHLY');
      const controlResult = calculateInterestPayment(1000, 0.05, 'monthly');
      expect(result).toEqual(controlResult);
    });

    it('yearly capital case, calculate monthly', () => {
      const result = calculateInterestPayment(1000, 0.05, 'YEARLY');
      const controlResult = calculateInterestPayment(1000, 0.05, 'yearly');
      expect(result).toEqual(controlResult);
    });

    it('throws or handles invalid frequency gracefully (if not guarded)', () => {
      const result = calculateInterestPayment(1000, 0.05, 'weekly');
      expect(result).toBeDefined();
    });
  });
});
