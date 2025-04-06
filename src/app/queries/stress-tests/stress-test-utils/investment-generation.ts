import { MAX_FORECAST_SIZE } from '../../../../config/constants';
import calculateInterestPayment from './ipmt-utils';

export interface InvestmentDetails {
  investmentAmount: number;
  interestRate: number;
  impactedYears: number;
  reinvestmentPercentage: number;
}
const generateInvestmentBalances = ({ investmentAmount, interestRate }: InvestmentDetails) => {
  let interestEarned = 0;
  const investmentBalances: number[] = [];
  let balance = investmentAmount;

  for (let forecastedYears = 0; forecastedYears < MAX_FORECAST_SIZE; forecastedYears++) {
    interestEarned = calculateInterestPayment(balance, interestRate, 'yearly');

    balance += interestEarned;
    investmentBalances.push(balance);
  }
  return investmentBalances;
};

export default generateInvestmentBalances;
