import { describe, it, expect } from 'vitest';
import simulateDecreaseInBondReturn from '../simulate-decrease-in-bond-return';

describe('Stress Test 5 - Edge Cases', () => {
  it('generic data', () => {
    const result = simulateDecreaseInBondReturn({
      loanAmount: 5000,
      loanPeriod: 24,
      baselineInterestRate: 0.06,
      stressTestInterestRate: 0.017,
    });
    expect(result.stressEffects[0]).toBeCloseTo(215, 0);
    expect(result.stressEffects[11]).toBeCloseTo(1097, 0);
  });

  it('stress > base interest rate', () => {
    expect(() => simulateDecreaseInBondReturn({
      loanAmount: 999999,
      loanPeriod: 24,
      baselineInterestRate: 0.017,
      stressTestInterestRate: 0.06, // Edge case: stress test interest rate greater than baseline
    }))
      .toThrowError('Baseline interest rate must be greater than or equal to stress test interest rate.');
  });

  describe('Loan Amount', () => {
    it('NaN loan amount, throws error', () => {
      expect(() => simulateDecreaseInBondReturn({
        loanAmount: NaN, // Edge case: NaN amount
        loanPeriod: 24,
        baselineInterestRate: 0.06,
        stressTestInterestRate: 0.017,
      }))
        .toThrowError('Invalid input: Value must be a valid number.');
    });

    it('non-number loan amount, throws error', () => {
      expect(() => simulateDecreaseInBondReturn({
        loanAmount: 'watwat', // Edge case: non-number amount
        loanPeriod: 24,
        baselineInterestRate: 0.06,
        stressTestInterestRate: 0.017,
      }))
        .toThrowError('Invalid input: Value must be a valid number.');
    });

    it('negative loan amount, throws error', () => {
      expect(() => simulateDecreaseInBondReturn({
        loanAmount: -999999, // Edge case: negative amount
        loanPeriod: 24,
        baselineInterestRate: 0.06,
        stressTestInterestRate: 0.017,
      }))
        .toThrowError('Invalid input: Value must be a positive number.');
    });

    it('0 loan amount, returns an array filled with zeroes', () => {
      const result = simulateDecreaseInBondReturn({
        loanAmount: 0, // Edge case: 0 amount
        loanPeriod: 24,
        baselineInterestRate: 0.06,
        stressTestInterestRate: 0.017,
      });
      expect(result.stressEffects.every((v) => v === 0)).toBe(true);
      expect(result.residualEffects.every((v) => v === 0)).toBe(true);
    });
  });

  describe('Loan Period', () => {
    it('NaN year loan period, ', () => {
      expect(() => simulateDecreaseInBondReturn({
        loanAmount: 999999,
        loanPeriod: NaN, // Edge case: NaN period
        baselineInterestRate: 0.06,
        stressTestInterestRate: 0.017,
      }))
        .toThrowError('Invalid input: Value must be a valid number.');
    });

    it('non-number year loan period, ', () => {
      expect(() => simulateDecreaseInBondReturn({
        loanAmount: 999999,
        loanPeriod: 'was', // Edge case: non-number period
        baselineInterestRate: 0.06,
        stressTestInterestRate: 0.017,
      }))
        .toThrowError('Invalid input: Value must be a valid number.');
    });

    it('negative year loan period, ', () => {
      expect(() => simulateDecreaseInBondReturn({
        loanAmount: 999999,
        loanPeriod: -24, // Edge case: negative period
        baselineInterestRate: 0.06,
        stressTestInterestRate: 0.017,
      }))
        .toThrowError('Invalid input: Value must be a positive number.');
    });

    it('0 year loan period, ', () => {
      const result = simulateDecreaseInBondReturn({
        loanAmount: 999999,
        loanPeriod: 0, // Edge case: 0 period
        baselineInterestRate: 0.06,
        stressTestInterestRate: 0.017,
      });
      expect(result.stressEffects.every((v) => v === 0)).toBe(true);
      expect(result.residualEffects.every((v) => v === 0)).toBe(true);
    });
  });
});
