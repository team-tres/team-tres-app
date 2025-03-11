export interface LoanCalculatorInput {
  loanAmount: number;
  AnnualInterestRate: number;
  loanPeriod: number; // years
  startDate: Date;
}

export interface LoanCalculatorOutput {
  monthlyPayment: number;
  numberOfPayments: number;
  interestPerPayment: number[];
}

// calc montly payment
export const calculateMonthlyPayment = (loanAmount: number, AnnualInterestRate: number, months: number): number => {
  const monthlyRate = AnnualInterestRate / 100 / 12;
  if (monthlyRate === 0) return loanAmount / months;
  const numerator = monthlyRate * loanAmount;
  const denominator = 1 - (1 + monthlyRate) ** -months;
  return numerator / denominator;
};

// calc loan details
export const calculateLoan = (input: LoanCalculatorInput): LoanCalculatorOutput => {
  const { loanAmount, AnnualInterestRate, loanPeriod } = input;

  const monthsYear = 12;
  const numberOfPayments = loanPeriod * monthsYear;

  const monthlyPayment = calculateMonthlyPayment(loanAmount, AnnualInterestRate, numberOfPayments);

  const interestPerPayment: number[] = [];

  let remainingBalance = loanAmount;

  for (let month = 1; month <= numberOfPayments; month++) {
    const monthlyInterest = remainingBalance * (AnnualInterestRate / 100 / monthsYear);
    interestPerPayment.push(monthlyInterest);

    remainingBalance -= (monthlyPayment - monthlyInterest);
  }

  return {
    monthlyPayment,
    numberOfPayments,
    interestPerPayment,
  };
};
