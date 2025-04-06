import { MAX_FORECAST_SIZE, ANNUAL_RETURN_RATE } from '@/config/constants';
import calculateResidualEffects from './stress-test-utils/residual-effects';

interface StressData {
  increaseInExpenses: number[];
  expenseIncreasePercentage: number; // Needed for stress test settings
}

const calculateStressTest4 = (data: StressData) => {
  const stressEffects: number [] = [];
  if (data.increaseInExpenses.length < MAX_FORECAST_SIZE) {
    throw new Error('Insufficient data for stress test 4.');
  }
  for (let forecastedYears = 0; forecastedYears < MAX_FORECAST_SIZE; forecastedYears++) {
    const increaseInExpenses = data.increaseInExpenses[forecastedYears] * (data.expenseIncreasePercentage);
    stressEffects.push(increaseInExpenses);
  }

  const residualEffectsData = {
    principals: stressEffects,
    annualReturnRate: ANNUAL_RETURN_RATE,
  };

  const residualEffects = calculateResidualEffects(residualEffectsData);

  return {
    stressEffects,
    residualEffects,
  } as {
    stressEffects: number[];
    residualEffects: number[];
  };
};

export default calculateStressTest4;
