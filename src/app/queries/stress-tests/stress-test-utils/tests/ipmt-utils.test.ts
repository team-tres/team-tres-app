import { describe, it, expect } from 'vitest';
import calculateInterestPayment from '../ipmt-utils';

describe('calculateInterestPayment', () => {
  it('calculates monthly interest correctly', () => {
    const result = calculateInterestPayment(1000, 0.06);
    expect(result).toBeCloseTo(5, 1);
  });

  it('calculates yearly interest correctly', () => {
    const result = calculateInterestPayment(1000, 0.06, 'yearly');
    expect(result).toBeCloseTo(60);
  });
});