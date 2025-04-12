import { validateValue } from '../../../utils/validation-utils';
import { CURRENT_YEAR, MAX_FORECAST_SIZE } from '../../../config/constants';
import calculateResidualEffects3, { ResidualEffectData } from './stress-test-utils/one-time-event-expense-residual-effects';

/**
 * Calculates the stress test results for an expense increase from a given event year.
 * The function simulates the financial effects of an expense increase at a specific event year
 * and then calculates the residual effects (long-term financial impact) from that event.
 *
 * @param expense - Expense amount to be applied in the event year
 * @param eventYear - Year in which the expense increase occurs, must be within the forecast range
 *
 * @returns An object containing:
 *  - stressEffects: Calculated stress effects, which represent the immediate financial impact of the expense increase
 *    starting at the given eventYear
 *  - residualEffects: Compounded residual effects based on the stress effects, representing the long-term impact of
 *    the expense increase on financials over the forecast period
 *
 * @throws {Error} If the `eventYear` is before the current year or outside of the forecast range
 */
const simulateOneTimeEventExpense = ({ expense, eventYear }: ResidualEffectData) => {
  validateValue(expense, 'positive');
  validateValue(eventYear, 'positive');
  if (eventYear > (CURRENT_YEAR + MAX_FORECAST_SIZE)) {
    return {
      stressEffects: Array(MAX_FORECAST_SIZE).fill(0),
      residualEffects: Array(MAX_FORECAST_SIZE).fill(0),
    };
  }

  if (eventYear < CURRENT_YEAR) {
    throw new Error('Invalid input: Event year is before forecast range.');
  }

  const stressEffects: number[] = new Array(MAX_FORECAST_SIZE).fill(0);
  stressEffects[eventYear - CURRENT_YEAR] = expense;
  const residualEffects = calculateResidualEffects3({ expense, eventYear });

  return {
    stressEffects,
    residualEffects,
  } as {
    stressEffects: number[];
    residualEffects: number[];
  };
};

export default simulateOneTimeEventExpense;
