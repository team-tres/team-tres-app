import { validateValue } from '../../../utils/validation-utils';
import { CURRENT_YEAR, MAX_FORECAST_SIZE } from '../../../config/constants';
import calculateResidualEffects3, { ResidualEffectData } from './stress-test-utils/residual-effects-3';

const CalculateStressTest3 = ({ expense, eventYear }: ResidualEffectData) => {
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

export default CalculateStressTest3;
