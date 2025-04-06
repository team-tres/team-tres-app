import { describe, it, expect } from 'vitest';
import generateInvestmentBalances from '../stress-test-utils/investment-generation';

describe('generateInvestmentBalances', () => {
  it('generates balances with 0% interest rate', () => {
    const result = generateInvestmentBalances({
      investmentAmount: 10000,
      interestRate: 0,
      impactedYears: 10,
      reinvestmentPercentage: 1,
    });
    expect(result.every((v) => v === 10000)).toBe(true);
  });

  it('generates growing balances with interest', () => {
    const result = generateInvestmentBalances({
      investmentAmount: 10000,
      interestRate: 0.05,
      impactedYears: 10,
      reinvestmentPercentage: 1,
    });
    expect(result[1]).toBeGreaterThan(result[0]);
  });
});