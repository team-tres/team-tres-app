import { ANNUAL_RETURN_RATE, MAX_FORECAST_SIZE } from '../../../../config/constants';
import { isValidArray } from '../../../../utils/validation-utils';

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
