import { isValidArray, validateValue } from '../../../utils/validation-utils';
import { MAX_FORECAST_SIZE } from '../../../config/constants';
import calculateResidualEffects from './stress-test-utils/residual-effects';

interface StressData {
  expensesByYear: number[];
  increasePercentage: number;
}

/**
 * Calculates the stress test results for an increase in expenses based on the provided yearly
 * expense data and a given increase percentage.
 * The function applies the increased percentage to the expense of each year and then calculates
 * the resulting stress effects and residual effects.
 *
 * @param expensesByYear - Array of yearly expenses. Each forecast year has one expense value
 * @param increasePercentage - Percentage by which the expenses will increase, expressed as a decimal
 *
 * @returns An object containing:
 *  - stressEffects: The calculated stress effects, representing the immediate financial impact of
 *    the expense increase for each year, based on the increasePercentage
 *  - residualEffects: The compounded residual effects based on the stress effects, representing the
 *    long-term impact of the expense increase on financials over the forecast period
 *
 * @throws {Error} If the increasePercentage is less than or equal to 0 or if expensesByYear is invalid
 */
const simulateIncreaseInOperatingExpenses = ({
  expensesByYear,
  increasePercentage,
}: StressData) => {
  if (
    expensesByYear.length === 0
    || increasePercentage === 0
  ) {
    return {
      stressEffects: Array(MAX_FORECAST_SIZE).fill(0),
      residualEffects: Array(MAX_FORECAST_SIZE).fill(0),
    };
  }
  const stressEffects: number [] = [];
  validateValue(increasePercentage, 'positive');
  isValidArray(expensesByYear, 'number');

  for (let forecastedYears = 0; forecastedYears < MAX_FORECAST_SIZE; forecastedYears++) {
    const increaseInExpense = expensesByYear[forecastedYears] ?? 0;
    const increaseInExpenses = increaseInExpense * (increasePercentage);
    stressEffects.push(increaseInExpenses);
  }

  const residualEffects = calculateResidualEffects(stressEffects);

  return {
    name: 'increaseInOperatingExpenses',
    stressEffects,
    residualEffects,
  } as {
    stressEffects: number[];
    residualEffects: number[];
  };
};

export default simulateIncreaseInOperatingExpenses;
