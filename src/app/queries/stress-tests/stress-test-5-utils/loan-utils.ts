import { MONTHS_IN_YEAR } from '@config/constants';

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
  const monthlyRate = interestRate / MONTHS_IN_YEAR;
  if (monthlyRate === 0) return loanAmount / numberOfPayments;
  const numerator = monthlyRate * loanAmount;
  const denominator = 1 - (1 + monthlyRate) ** -numberOfPayments; // Amortisation formula
  return numerator / denominator;
};

/**
 * Calculates thethe monthly payment, total number of payments, and interest paid per payment of a loan.
 * This function uses an amortisation formula to calculate the monthly payments and interest for each payment.
 *
 * @param input The input parameters
 * @param input.loanAmount The total loan amount
 * @param input.interestRate The annual interest rate of the loan, represented as a decimal (e.g., 6% is 0.06)
 * @param input.loanPeriod The total duration of the loan in years
 * @returns An object containing the loan details:
 *  - `monthlyPayment`: The amount to bepaid monthly
 *  - `numberOfPayments`: The total number of payments to be made (Loan in Years * MONTHS_IN_YEAR)
 *  - `interestPerPayment`: An array of monthly interest paid
 */
export const calculateLoan = (input: LoanCalculatorInput): LoanCalculatorOutput => {
  const { loanAmount, interestRate, loanPeriod } = input;

  const numberOfPayments = loanPeriod * MONTHS_IN_YEAR;

  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, numberOfPayments);

  // Track interest paid per month
  const interestPerPayment: number[] = [];

  let remainingBalance = loanAmount;

  for (let month = 1; month <= numberOfPayments; month++) {
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
