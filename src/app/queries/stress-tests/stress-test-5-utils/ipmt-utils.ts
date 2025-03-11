export default function calculateInterestPayment(loanAmount: number, annualInterestRate: number): number {
  const monthlyRate = annualInterestRate / 100 / 12;

  const interestPayment = loanAmount * monthlyRate;
  return interestPayment;
}
