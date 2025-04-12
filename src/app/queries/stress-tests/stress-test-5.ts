import generateLoanBalances from './stress-test-utils/loan-generation';
import calculateResidualEffects from './stress-test-utils/residual-effects';
import calculatePrincipal from './stress-test-utils/principal-utils';
import { MAX_FORECAST_SIZE } from '../../../config/constants';

export interface StressData5 {
  loanAmount: number,
  loanPeriod: number,
  baselineInterestRate: number,
  stressTestInterestRate: number,
}

/**
 * Calculates loan balances and residual effects based on the loan parameters.
 *
 * Compares the baseline scenario with the decreased interest rate to assess the impact with principal and
 * residual effects.
 *
 * @param loanAmount The total loan amount. also known as the currentDebtService
 * @param loanPeriod The loan period in years
 * @param baselineInterestRate The interest rate for the baseline scenario, represeted as a decimal
 * (e.g., 6% is 0.06)
 * @param stressTestInterestRate The interest rate for the stress test scenario, represented as a decimal
 * (e.g., 1.7% is 0.017)
 * @returns Object with the principal and the residual effect values
 */
export default function performStressTest({
  loanAmount,
  loanPeriod,
  baselineInterestRate,
  stressTestInterestRate,
}: StressData5) {
  if (baselineInterestRate < stressTestInterestRate) {
    throw new Error('Baseline interest rate must be greater than or equal to stress test interest rate.');
  }

  if (loanAmount === 0 || loanPeriod === 0) {
    return {
      stressEffects: Array(MAX_FORECAST_SIZE).fill(0),
      residualEffects: Array(MAX_FORECAST_SIZE).fill(0),
    };
  }
  // Generating loan balances for baseline and stress test loans
  const balances = (rate: number) => generateLoanBalances(loanAmount, rate, loanPeriod);
  const baselineLoanBalances = balances(baselineInterestRate);
  const stressTestLoanBalances = balances(stressTestInterestRate);

  // Calculates principal difference (baseline - stress test)
  const stressEffects = calculatePrincipal(baselineLoanBalances, stressTestLoanBalances);
  const residualEffects = calculateResidualEffects(stressEffects);

  return {
    stressEffects,
    residualEffects,
  } as {
    stressEffects: number[];
    residualEffects: number[];
  };
}
