import { MAX_FORECAST_SIZE, MONTHS_IN_YEAR } from '../../../../config/constants';
import { calculateLoan, LoanCalculatorInput, LoanCalculatorOutput } from './loan-utils';
import calculateInterestPayment from './ipmt-utils';
import { validateValue } from '../../../../utils/validation-utils';

/**
 * Generates an array of loan balances by year, based on the loan amount, interest rate, and loan period.
 * Calculates the yearly loan balances by taking into account the interest accumulated and the yearly payments.
 *
 * @param loanAmount The total loan amount
 * @param interestRate The annual interest rate of the loan, represented as a decimal (e.g., 6% is 0.06)
 * @param loanPeriod The loan period in years
 * @returns An array of loan balances for each year, including interest accumulation and payments
 */
export default function generateLoanBalances(
  loanAmount: number,
  interestRate: number,
  loanPeriod: number,
): number[] {
  const input: LoanCalculatorInput = {
    loanAmount,
    interestRate,
    loanPeriod,
  };

  // Get the loan details from the loan-utils module
  const loanDetails: LoanCalculatorOutput = calculateLoan(input);
  let balance = validateValue(loanAmount, 'positive');
  let newBalance = balance;
  const yearlyPayment = loanDetails.monthlyPayment * MONTHS_IN_YEAR;
  const loanBalances: number[] = [];

  // Handle zero year loan period
  if (loanPeriod <= 0 || loanAmount <= 0) return new Array(MAX_FORECAST_SIZE).fill(0);

  // Loop through each year to calculate the subsequent balances
  for (let year = 0; year <= MAX_FORECAST_SIZE; year++) {
    // Loan is paid off
    if (balance <= 0) {
      loanBalances.push(0);
      break;
    }

    if (year <= input.loanPeriod) {
      const interestEarned = calculateInterestPayment(balance, input.interestRate) * MONTHS_IN_YEAR;

      newBalance = balance + interestEarned;

      // newBalance = presentBalance + interest - yearlyPayment
      balance += interestEarned - yearlyPayment + loanDetails.interestPerPayment[year];

      loanBalances.push(newBalance);
    }
  }

  while (loanBalances.length < MAX_FORECAST_SIZE) {
    loanBalances.push(0);
  }

  return loanBalances;
}
