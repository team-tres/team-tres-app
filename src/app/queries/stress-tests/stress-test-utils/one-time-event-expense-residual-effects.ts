import { validateValue } from '../../../../utils/validation-utils';
import { CURRENT_YEAR, MAX_FORECAST_SIZE, ANNUAL_RETURN_RATE } from '../../../../config/constants';

export interface ResidualEffectData {
  expense: number;
  eventYear: number;
}

/**
 * Calculates the residual effects due to an expense event.
 * The function computes the compounded loss of returns from the year of the event and onwards.
 * Considers the expense and the annual return rate.
 * It returns an array representing the compounded loss for each forecast year.
 *
 * @param expense - Expense amount that is impacting future returns, must be greater than zero
 * @param eventYear - Year in which the expense occurs, should be in the forecast range
 * @returns Array of compounded interest losses yearly
 *          Returns an array of zeroes if the event year or expense is invalid
 *
 * @throws {Error} Will throw an error if expense or eventYear is non-positive
 */
const calculateResidualEffects3 = ({ expense, eventYear }: ResidualEffectData) => {
  validateValue(expense, 'positive');
  validateValue(eventYear, 'positive');

  // Invalid event year or expense
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
    } else {
      processedYears++;
      // Calculate the compounded loss of missed returns
      const totalLoss = expense * (1 + ANNUAL_RETURN_RATE) ** processedYears - expense;
      totalInterestsLost.push(totalLoss);
    }
  }
  return totalInterestsLost;
};

export default calculateResidualEffects3;
