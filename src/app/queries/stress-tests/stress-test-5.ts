import generateLoanBalances from './stress-test-utils/loan-generation';
import calculateResidualEffects from './stress-test-utils/residual-effects';
import calculatePrincipal from './stress-test-utils/principal-utils';

/**
 * Calculates loan balances and residual effects based on the loan parameters.
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
export default function performStressTest(
  loanAmount: number, // Needed for stress test settings
  loanPeriod: number, // Needed for stress test settings, still needs to be implemented
  baselineInterestRate: number, // Needed for stress test settings
  stressTestInterestRate: number, // Needed for stress test settings
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
  };

  const residualEffects = calculateResidualEffects(residualEffectData);

  return {
    principal,
    residualEffects,
  };
}
