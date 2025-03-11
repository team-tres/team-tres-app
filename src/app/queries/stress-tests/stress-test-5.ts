import generateLoanBalances from './stress-test-5-utils/loan-generation';
import calculateResidualEffects from './residual-effects';

/**
 * Calculates the principal differences between baseline and stress test loan balances.
 * The principal is calculated by subtracting the stress test loan balance from the baseline loan balance.
 *
 * @param baselineBalances An array of baseline loan balances over time
 * @param stressTestBalances An array of stress test loan balances over time (decreased interest rate)
 * @returns An array of principal values (the differences between the baseline and stress test loan balances)
 */
function calculatePrincipal(baselineBalances: number[], stressTestBalances: number[]): number[] {
  return baselineBalances.map((balance, index) => balance - stressTestBalances[index]);
}

/**
 * Calculates loan balances and residual effects based on the loan parameters.
 * Compares the baseline scenario with the decreased interest rate to assess the impact with principal and
 * residual effects.
 *
 * @param loanAmount The total loan amount
 * @param loanPeriod The loan period in years
 * @param baselineInterestRate The interest rate for the baseline scenario, represeted as a decimal
 * (e.g., 6% is 0.06)
 * @param stressTestInterestRate The interest rate for the stress test scenario, represented as a decimal
 * (e.g., 1.7% is 0.017)
 * @param annualInterestRate The annual return rate used for calculating residual effects, represented as a
 * decimal (e.g., 6.02% is 0.0602)
 * @returns Object with the principal and the residual effect values
 */
export default function performStressTest(
  loanAmount: number,
  loanPeriod: number,
  baselineInterestRate: number,
  stressTestInterestRate: number,
  annualInterestRate: number,
) {
  // Generating loan balances for baseline and stress test loans
  const baselineLoanBalances = generateLoanBalances(
    loanAmount,
    baselineInterestRate,
    loanPeriod,
  );

  const stressTestLoanBalances = generateLoanBalances(
    loanAmount,
    stressTestInterestRate,
    loanPeriod,
  );

  // Calculates principal difference (baseline - stress test)
  const principal = calculatePrincipal(baselineLoanBalances, stressTestLoanBalances);

  const residualEffectData = {
    principals: principal,
    annualReturnRate: annualInterestRate,
  };

  const residualEffects = calculateResidualEffects(residualEffectData);

  return {
    principal,
    residualEffects,
  };
}
