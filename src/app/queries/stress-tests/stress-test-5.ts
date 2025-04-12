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
 * Performs a stress test on loan balances by comparing the baseline scenario (with the original
 * interest rate) with a stress test scenario (with a reduced interest rate). This function
 * calculates the loan balances for both scenarios, the principal difference (baseline - stress test),
 * and the residual effects of the loan over time.
 *
 * The function assumes that the baseline interest rate should always be greater than or equal to the
 * stress test interest rate.
 *
 * @param loanAmount Total loan amount, also known as the current debt service
 * @param loanPeriod Loan period in years
 * @param baselineInterestRate Interest rate for the baseline scenario, represented as a decimal
 * @param stressTestInterestRate Interest rate for the stress scenario, represented as a decimal
 *
 * @returns An object containing:
 *  - stressEffects: The calculated principal differences (baseline - stress test), representing the
 *    impact of the interest rate reduction on the loan balances
 *  - residualEffects: The long-term impact of the stress test on the financials over the forecast period
 *
 * @throws {Error} If the baseline interest rate is less than the stress test interest rate
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
