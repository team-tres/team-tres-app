import { MAX_FORECAST_SIZE } from '../../../../config/constants';
import calculateInterestPayment from './ipmt-utils';
import { validateValue, validateAndClampPercentage, isValidPeriod } from '../../../../utils/validation-utils';

/**
 * Interface for the input parameters to calculate the investment balances.
 * @interface InvestmentDetails
 * @property {number} investmentAmount - Initial amount to be invested.
 * @property {number} interestRate - Interest rate for the investment (expressed as a decimal).
 * @property {number} impactedYears - Number of years the investment is impacted by interest and reinvestment.
 * @property {number} reinvestmentPercentage - Percentage of interest that will be reinvested (expressed as a decimal).
 */
export interface InvestmentDetails {
  investmentAmount: number;
  interestRate: number;
  impactedYears: number;
  reinvestmentPercentage: number;
}

/**
 * Simulates an array of investment balances based on the given parameters.
 * It accounts for reinvestment of earned interest and calculates the balance over time.
 * Handles periods shorter than the forecast period.
 *
 * The function assumes that:
 * 1. The investment is compounded yearly
 * 2. The reinvestment percentage is clamped to a valid value between 0% and 100% (0 to 1)
 * 3. The impacted years must be greater than zero; otherwise, it returns an array filled with zeros
 *
 * @param {InvestmentDetails} params - Parameters for calculating investment balances
 * @returns {number[]} - Array of calculated investment balances for each year up to the maximum forecast period
 * @throws {Error} - Throws an error if any of the input values are invalid
 *
 */
const simulateInvestmentBalance = ({
  investmentAmount,
  interestRate,
  impactedYears,
  reinvestmentPercentage,
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

export default simulateInvestmentBalance;
