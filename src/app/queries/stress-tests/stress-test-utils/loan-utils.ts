import { MAX_FORECAST_SIZE, MONTHS_IN_YEAR } from '../../../../config/constants';
import { validateValue } from '../../../../utils/validation-utils';

export interface LoanCalculatorInput {
  loanAmount: number;
  interestRate: number;
  loanPeriod: number;
}

export interface LoanCalculatorOutput {
  monthlyPayment: number;
  numberOfPayments: number;
  interestPerPayment: number[];
}

/**
 * Calculates the monthly payment for a loan.
 * @param loanAmount The total loan amount
 * @param interestRate The annual interest rate, represented as a decimal (e.g., 6% is 0.06)
 * @param numberOfPayments The total number of monthly payments
 * @returns The amount paid monthly
 */
export const calculateMonthlyPayment = (loanAmount: number, interestRate: number, numberOfPayments: number): number => {
  let monthlyRate = 0;
  if (interestRate !== 0) monthlyRate = interestRate / MONTHS_IN_YEAR;
  if (monthlyRate === 0) return loanAmount / numberOfPayments;

  const numerator = monthlyRate * loanAmount;
  const denominator = 1 - (1 + monthlyRate) ** -numberOfPayments; // Amortisation formula
  return numerator / denominator;
};

/**
 * Calculates the monthly payment, total number of payments, and interest paid per payment of a loan.
 * This function uses an amortisation formula to calculate the monthly payments and interest for each payment.
 *
 * @param params Input parameters for the loan calculation
 * @param loanAmount Total loan amount
 * @param interestRate Annual interest rate of the loan, represented as a decimal
 * @param loanPeriod Total duration of the loan in years
 * @returns An object containing the loan details:
 *  - monthlyPayment: Amount to be paid monthly
 *  - numberOfPayments: Total number of payments to be made
 *  - interestPerPayment: Array of monthly interest paid
 */
export const calculateLoan = ({ loanAmount, interestRate, loanPeriod }: LoanCalculatorInput): LoanCalculatorOutput => {
  validateValue(loanAmount, 'positive');
  validateValue(loanPeriod, 'positive');
  validateValue(interestRate, 'interestRate');

  const numberOfPayments = loanPeriod * MONTHS_IN_YEAR;

  const monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    interestRate,
    numberOfPayments,
  );

  // Track interest paid per month
  const interestPerPayment: number[] = [];

  let remainingBalance = loanAmount;
  if (loanPeriod <= 0 || loanAmount <= 0 || numberOfPayments <= 0) {
    return {
      monthlyPayment: 0,
      numberOfPayments: 0,
      interestPerPayment: new Array(MAX_FORECAST_SIZE).fill(0),
    };
  }
  for (let month = 1; month <= MAX_FORECAST_SIZE; month++) {
    const monthlyInterest = remainingBalance * (interestRate / MONTHS_IN_YEAR);
    interestPerPayment.push(monthlyInterest);

    remainingBalance -= (monthlyPayment - monthlyInterest);
  }

  return {
    monthlyPayment,
    numberOfPayments,
    interestPerPayment,
  };
};
