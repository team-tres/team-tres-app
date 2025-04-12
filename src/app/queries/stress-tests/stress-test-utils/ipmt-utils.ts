import { validateValue } from '../../../../utils/validation-utils';
import { MONTHS_IN_YEAR } from '../../../../config/constants';

/**
 * Calculates the interest payment for a given loan amount based on the monthly or annual interest rate.
 * If the frequency is invalid, it defaults to monthly calculations.
 *
 * @param loanAmount Total loan amount
 * @param annualInterestRate Annual interest rate of the loan, represented as a decimal
 * @returns Interest payment for a single month based on the provided loan amount and annual interest rate
 */
export default function calculateInterestPayment(
  loanAmount: number,
  annualInterestRate: number,
  frequency: 'monthly' | 'yearly' = 'monthly', // No frequency defaults to monthly based calculations
): number {
  validateValue(loanAmount, 'positive');
  validateValue(annualInterestRate, 'interestRate');
  if (frequency.toLowerCase() === 'yearly') {
    return loanAmount * annualInterestRate;
  }
  const monthlyInterestRate = annualInterestRate / MONTHS_IN_YEAR;
  return loanAmount * monthlyInterestRate;
}
