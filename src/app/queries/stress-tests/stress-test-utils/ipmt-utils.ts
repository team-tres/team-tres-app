import { MONTHS_IN_YEAR } from '../../../../config/constants';

/**
 * Calculates the interest payment for a given loan amount based on the annual interest rate.
 * The function assumes the interest rate is provided as an annual rate and calculates the interest for one month.
 *
 * @param loanAmount The total loan amount
 * @param annualInterestRate The annual interest rate of the loan, represented as a decimal (e.g., 6% is 0.06)
 * @returns The interest payment for a single month based on the provided loan amount and annual interest rate
 */
export default function calculateInterestPayment(
  loanAmount: number,
  annualInterestRate: number,
  frequency: 'monthly' | 'yearly' = 'monthly',
): number {
  if (frequency === 'yearly') {
    return loanAmount * annualInterestRate;
  }
  const monthlyInterestRate = annualInterestRate / MONTHS_IN_YEAR;
  return loanAmount * monthlyInterestRate;
}
