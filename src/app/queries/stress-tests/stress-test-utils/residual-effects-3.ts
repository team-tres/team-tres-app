import { validateValue } from '../../../../utils/validation-utils';
import { CURRENT_YEAR, MAX_FORECAST_SIZE, ANNUAL_RETURN_RATE } from '../../../../config/constants';

export interface ResidualEffectData {
  expense: number; // Needed for stress test settings
  eventYear: number; // Needed for stress test settings
}

const calculateResidualEffects3 = ({ expense, eventYear }: ResidualEffectData) => {
  validateValue(expense, 'positive');
  validateValue(eventYear, 'positive');

  if (eventYear > (CURRENT_YEAR + MAX_FORECAST_SIZE)
    || eventYear < CURRENT_YEAR
    || expense === 0) {
    return new Array(MAX_FORECAST_SIZE).fill(0);
  }

  const totalInterestsLost: number[] = [];
  const startYear = CURRENT_YEAR;
  let processedYears = 0;
  for (let forecastedYear = 0; forecastedYear < MAX_FORECAST_SIZE; forecastedYear++) {
    if (eventYear > (startYear + forecastedYear)) {
      totalInterestsLost.push(0);
    } else if (startYear < eventYear) {
      processedYears++;
      // Calculate the compounded loss of missed returns
      const totalLoss = expense * (1 + ANNUAL_RETURN_RATE) ** processedYears - expense;
      totalInterestsLost.push(totalLoss);
    }
  }
  return totalInterestsLost;
};

export default calculateResidualEffects3;
