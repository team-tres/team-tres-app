interface StressData {
  presentBalance: number;
  interestRate: number;
  interestRateDrop: number;
  impactedYears: number;
  reinvestmentPercentage: number;
}

const calculateStressTest = (data: StressData) => {
  const interestEarned = data.presentBalance * data.interestRate;
  const newBalance = data.presentBalance + interestEarned;
  const test1interest = data.interestRate * (1 - data.interestRateDrop);
  const test1interestEarned = test1interest * data.presentBalance;
  const test1Balance = test1interestEarned + data.presentBalance;
  const principal = newBalance - test1Balance;
  return {
    interestEarned,
    newBalance,
    test1interest,
    test1interestEarned,
    test1Balance,
    principal,
  };
};

export default calculateStressTest;
