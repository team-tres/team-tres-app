import { MAX_FORECAST_SIZE } from '../../../../config/constants';
import calculateInterestPayment from './ipmt-utils';

export interface InvestmentDetails {
  investmentAmount: number;
  interestRate: number;
  impactedYears: number;
  reinvestmentPercentage: number;
}
const generateInvestmentBalances = (data: InvestmentDetails) => {
  const newInterestRate = data.interestRate;
  let interestEarned = 0;
  const investmentBalances: number[] = [];
  let balance = data.investmentAmount;
  let newBalance = balance;

  for (let forecastedYears = 0; forecastedYears < MAX_FORECAST_SIZE; forecastedYears++) {
    interestEarned = calculateInterestPayment(balance, newInterestRate, 'yearly');
    newBalance = balance + interestEarned;

    balance += interestEarned;
    investmentBalances.push(newBalance);
  }
  return investmentBalances;
};

export default generateInvestmentBalances;
