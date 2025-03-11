import { MONTHS_IN_YEAR } from '@config/constants';
import { calculateLoan, LoanCalculatorInput, LoanCalculatorOutput } from './loan-utils';
import calculateInterestPayment from './ipmt-utils';

export default function generateLoanBalances(loanAmount: number, interestRate: number, loanPeriod: number): number[] {
  const input: LoanCalculatorInput = {
    loanAmount,
    interestRate,
    loanPeriod,
  };

  const loanDetails: LoanCalculatorOutput = calculateLoan(input);
  let balance = input.loanAmount;
  let newBalance = balance;
  const yearlyPayment = loanDetails.monthlyPayment * MONTHS_IN_YEAR;
  const loanBalances: number[] = [];

  for (let year = 0; year <= input.loanPeriod; year++) {
    const interestEarned = calculateInterestPayment(balance, input.interestRate) * MONTHS_IN_YEAR;

    newBalance = balance + interestEarned;

    balance += interestEarned - yearlyPayment + loanDetails.interestPerPayment[year];

    loanBalances.push(newBalance);

    if (balance <= 0) {
      break;
    }
  }

  return loanBalances;
}
