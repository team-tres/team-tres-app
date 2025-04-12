import { MAX_FORECAST_SIZE } from '../../../../config/constants';
import calculateInterestPayment from './ipmt-utils';
import { validateValue, validateAndClampPercentage, isValidPeriod } from '../../../../utils/validation-utils';

export interface InvestmentDetails {
  investmentAmount: number;
  interestRate: number;
  impactedYears: number;
  reinvestmentPercentage: number;
}
const generateInvestmentBalances = ({
  investmentAmount, // Screened
  interestRate, // Screened
  impactedYears, // Screened
  reinvestmentPercentage, // Screened
}: InvestmentDetails) => {
  if (!isValidPeriod(impactedYears)) {
    return new Array(MAX_FORECAST_SIZE).fill(0);
  }
  let interestEarned = 0;
  const investmentBalances: number[] = [];
  let balance = validateValue(investmentAmount, 'positive');
  const reinvestmentRate = validateAndClampPercentage(reinvestmentPercentage);
  const interestRateValue = validateValue(interestRate, 'interestRate');
  const investmentPeriod = validateValue(impactedYears, 'positive');

  for (let forecastedYears = 0; forecastedYears < MAX_FORECAST_SIZE; forecastedYears++) {
    interestEarned = calculateInterestPayment(balance, interestRateValue, 'yearly') * reinvestmentRate;

    if (forecastedYears < investmentPeriod) {
      balance += interestEarned;
    }
    investmentBalances.push(balance);
  }
  return investmentBalances;
};

export default generateInvestmentBalances;
