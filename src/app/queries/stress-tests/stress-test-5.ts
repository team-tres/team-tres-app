import generateLoanBalances from './stress-test-5-utils/loan-generation';
import calculateResidualEffects from './residual-effects';

function calculatePrincipal(baselineBalances: number[], stressTestBalances: number[]): number[] {
  return baselineBalances.map((balance, index) => balance - stressTestBalances[index]);
}

export default function performStressTest(
  loanAmount: number,
  loanPeriod: number,
  baselineInterestRate: number,
  stressTestInterestRate: number,
  annualInterestRate: number,
) {
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
