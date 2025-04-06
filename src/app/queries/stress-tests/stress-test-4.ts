import { MAX_FORECAST_SIZE } from '../../../config/constants';
import calculateResidualEffects from './stress-test-utils/residual-effects';

interface StressData {
  expensesByYear: number[];
  increasePercentage: number; // Needed for stress test settings
}

const calculateStressTest4 = ({
  expensesByYear,
  increasePercentage,
}: StressData) => {
  if (
    expensesByYear.length === 0
    || increasePercentage === 0
    || expensesByYear.length < MAX_FORECAST_SIZE
  ) {
    return {
      stressEffects: [],
      residualEffects: [],
    };
  }
  const stressEffects: number [] = [];

  for (let forecastedYears = 0; forecastedYears < MAX_FORECAST_SIZE; forecastedYears++) {
    const increaseInExpense = expensesByYear[forecastedYears] ?? 0;
    const increaseInExpenses = increaseInExpense * (increasePercentage);
    stressEffects.push(increaseInExpenses);
  }

  const residualEffects = calculateResidualEffects(stressEffects);

  return {
    stressEffects,
    residualEffects,
  } as {
    stressEffects: number[];
    residualEffects: number[];
  };
};

export default calculateStressTest4;
