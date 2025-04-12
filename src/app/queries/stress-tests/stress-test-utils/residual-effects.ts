import { ANNUAL_RETURN_RATE, MAX_FORECAST_SIZE } from '../../../../config/constants';
import { isValidArray } from '../../../../utils/validation-utils';

/**
 * Calculates the total residual effect based on an array of principal values.
 * This function computes the compounded loss for each forecast year, considering the principal values and
 * applies the annual return rate. This function sums up the losses from each principal for each forecast year.
 *
 * @param principals - Array of principal values (e.g., loan balances, investments, etc.)
 *                     Represents the amounts for which the compounded loss is calculated
 *                     Each value should be a valid positive number
 * @returns Array of compounded interest losses for each forecast year
 *          The array will have a length of MAX_FORECAST_SIZE
 *          Values will be the total residual loss for each year
 *
 * @throws {Error} If the `principals` array is invalid (non-array or contains non-numeric values)
 */
const calculateResidualEffects = (principals: number[]): number[] => {
  const totalInterestsLost: number[] = [];
  if (principals.length === 0) {
    return Array(MAX_FORECAST_SIZE).fill(0);
  }

  isValidArray(principals, 'number');

  for (let forecastedYear = 1; forecastedYear <= MAX_FORECAST_SIZE; forecastedYear++) {
    let totalLoss = 0;

    for (let principalCount = 0; principalCount < forecastedYear; principalCount++) {
      totalLoss += principals[principalCount] * (1 + ANNUAL_RETURN_RATE)
      ** (forecastedYear - principalCount) - principals[principalCount];
    }
    totalInterestsLost.push(totalLoss);
  }
  return totalInterestsLost;
};

export default calculateResidualEffects;
