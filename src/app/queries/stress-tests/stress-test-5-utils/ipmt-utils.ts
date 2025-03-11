import { MONTHS_IN_YEAR } from '@config/constants';

export default function calculateInterestPayment(loanAmount: number, annualInterestRate: number): number {
  const monthlyInterestRate = annualInterestRate / MONTHS_IN_YEAR;

  const interestPayment = loanAmount * monthlyInterestRate;
  return interestPayment;
}
