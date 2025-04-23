import { isValidArray } from '../../../../utils/validation-utils';
import { MAX_FORECAST_SIZE } from '../../../../config/constants';

/**
 * Calculates the principal differences between baseline and stress test loan balances.
 * The principal is calculated by subtracting the stress test loan balance from the baseline loan balance.
 *
 * @param baselineBalances Array of baseline loan balances over time
 * @param stressTestBalances Array of stress test loan balances over time (decreased interest rate)
 * @returns Array of principal values (the differences between the baseline and stress test loan balances)
 */
function calculatePrincipal(baselineBalances: number[], stressTestBalances: number[]): number[] {
  if (baselineBalances.length === 0 && stressTestBalances.length === 0) {
    return new Array(MAX_FORECAST_SIZE).fill(0);
  }

  isValidArray(baselineBalances, 'number');
  isValidArray(stressTestBalances, 'number');

  if (baselineBalances.length !== stressTestBalances.length) {
    throw new Error('Invalid Input: Mismatched array lengths.');
  }

  return baselineBalances.map((balance, index) => {
    const principal = balance - stressTestBalances[index];
    return principal;
  });
}

export default calculatePrincipal;
