import { CURRENT_YEAR, MAX_FORECAST_SIZE } from '@config/constants';
import calculateResidualEffects3, { ResidualEffectData } from './stress-test-utils/residual-effects-3';

const CalculateStressTest3 = (data: ResidualEffectData) => {
  const stressEffects: number[] = new Array(MAX_FORECAST_SIZE).fill(0);
  stressEffects[data.eventYear - CURRENT_YEAR] = data.expense;
  const residualEffects = calculateResidualEffects3(data);

  return {
    stressEffects,
    residualEffects,
  };
};

export default CalculateStressTest3;
