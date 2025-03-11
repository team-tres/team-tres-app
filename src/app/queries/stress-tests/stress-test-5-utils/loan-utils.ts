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

export const calculateMonthlyPayment = (loanAmount: number, interestRate: number, numberOfPayments: number): number => {
  const monthlyRate = interestRate / MONTHS_IN_YEAR;
  if (monthlyRate === 0) return loanAmount / numberOfPayments;
  const numerator = monthlyRate * loanAmount;
  const denominator = 1 - (1 + monthlyRate) ** -numberOfPayments;
  return numerator / denominator;
};

export const calculateLoan = (input: LoanCalculatorInput): LoanCalculatorOutput => {
  const { loanAmount, interestRate, loanPeriod } = input;

  const numberOfPayments = loanPeriod * MONTHS_IN_YEAR;

  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, numberOfPayments);

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
