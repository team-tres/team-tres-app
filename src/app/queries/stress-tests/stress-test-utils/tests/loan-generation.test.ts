import { describe, it, expect } from 'vitest';
import generateLoanBalances from '../loan-generation';

describe('generateLoanBalances', () => {
  it('generates decreasing balances for a valid loan', () => {
    const result = generateLoanBalances(10000, 0.05, 5);
    expect(result[1]).toBeLessThan(result[0]);
  });

  it('handles 0% interest gracefully', () => {
    const result = generateLoanBalances(1200, 0, 1);
    expect(result.length).toBeGreaterThan(0);
  });
});
