import { CURRENT_YEAR, MAX_FORECAST_SIZE, ANNUAL_RETURN_RATE } from '@config/constants';

export interface ResidualEffectData {
  expense: number; // Needed for stress test settings
  eventYear: number; // Needed for stress test settings
}

const calculateResidualEffects3 = (data: ResidualEffectData) => {
  const { expense } = data;
  const totalInterestsLost: number[] = [];
  const startYear = CURRENT_YEAR;

  for (let forecastedYear = 0; forecastedYear < MAX_FORECAST_SIZE; forecastedYear++) {
    if (forecastedYear < startYear) {
      totalInterestsLost.push(0);
    } else {
      const processedYears = forecastedYear - startYear + 1;
      // Calculate the compounded loss of missed returns
      const totalLoss = expense * (1 + ANNUAL_RETURN_RATE) ** processedYears - expense;
      totalInterestsLost.push(totalLoss);
    }
  }

  return totalInterestsLost;
};

export default calculateResidualEffects3;
