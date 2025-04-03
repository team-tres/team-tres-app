import { CURRENT_YEAR, MAX_FORECAST_SIZE, ANNUAL_RETURN_RATE } from '@config/constants';

export interface ResidualEffectData {
  expense: number;
  eventYear: number;
}

const calculateResidualEffects3 = (data: ResidualEffectData) => {
  const { expense } = data;
  const totalInterestsLost: number[] = [];
  let processedYears = 0;

  for (let forecastedYears = 0; forecastedYears < MAX_FORECAST_SIZE; forecastedYears++) {
    let totalLoss = 0;
    if (data.eventYear <= (CURRENT_YEAR + forecastedYears)) {
      processedYears++;
      totalLoss += expense * (1 + ANNUAL_RETURN_RATE) ** processedYears - expense;
    }
    totalInterestsLost.push(totalLoss);
  }
  return totalInterestsLost;
};

export default calculateResidualEffects3;
