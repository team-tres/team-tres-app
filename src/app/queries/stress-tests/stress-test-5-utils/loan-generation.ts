import { calculateLoan, LoanCalculatorInput, LoanCalculatorOutput } from './loan-utils';
import calculateInterestPayment from './ipmt-utils';

const input: LoanCalculatorInput = {
  loanAmount: 5000,
  AnnualInterestRate: 6,
  loanPeriod: 24,
  startDate: new Date('2025-03-10'),
};

const loanDetails: LoanCalculatorOutput = calculateLoan(input);

// DEBUGGING
console.log('Loan Calculation Details:');
console.log(`Monthly Payment: $${loanDetails.monthlyPayment.toFixed(2)}`);
console.log(`Number of Payments: ${loanDetails.numberOfPayments}`);
console.log(`Interest Per Payment (monthly): $${loanDetails.interestPerPayment[0].toFixed(2)}`);

let balance = input.loanAmount;
const yearlyPayment = loanDetails.monthlyPayment * 12;

for (let year = 0; year <= input.loanPeriod; year++) {
  console.log(`\nProcessing Year ${year}`);
  console.log(`Yearly Payment (12 * Monthly Payment): $${yearlyPayment.toFixed(2)}`);

  // calc IPMT
  const interestEarned = calculateInterestPayment(balance, input.AnnualInterestRate) * 12;

  // update bal
  balance += interestEarned - yearlyPayment + loanDetails.interestPerPayment[year];

  // DEBUGGING
  console.log(`End of Year ${year}:`);
  console.log(`  Remaining Balance: $${balance.toFixed(2)}`);
  console.log(`  Interest Earned: $${interestEarned.toFixed(2)}`);
  console.log(`  Interest Per Payment ${year}: $${loanDetails.interestPerPayment[year].toFixed(2)}`);

  if (balance <= 0) {
    break;
  }
}

// DEBUGGING
console.log(`Loan Start Date: ${input.startDate.toDateString()}`);

export { calculateLoan } from './loan-utils';
export type { LoanCalculatorInput, LoanCalculatorOutput } from './loan-utils';
