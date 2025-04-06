import { describe, it, expect } from 'vitest';
import { calculateLoan } from '../loan-utils';

describe('calculateLoan', () => {
  it('calculates correct loan outputs', () => {
    const result = calculateLoan({ loanAmount: 10000, interestRate: 0.05, loanPeriod: 5 });
    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.interestPerPayment.length).toBeGreaterThan(0);
  });
});
