interface StressData5 {
  PresentBalance: number,
  interestRate: number,
  term: number, // in years
  monthlyContribution: number,
  fullFunded: number,
}

const CalculateStressTest5 = (data:StressData5) => {
  const interestEarned = data.PresentBalance * data.interestRate;
  const newBalance = data.PresentBalance + interestEarned;
  const loanPayment;
  const interestMinusPayment;
  const balanceMinusPayment;
  const principalPaidTowardsTheLoan;
  const totalPaymentOnLoan;

  return interestEarned;
  return newBalance;
}