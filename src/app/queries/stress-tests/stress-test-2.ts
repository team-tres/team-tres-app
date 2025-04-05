import { MAX_FORECAST_SIZE, ANNUAL_RETURN_RATE } from '@/config/constants';
import calculateResidualEffects from './stress-test-utils/residual-effects';

interface StressData2 {
  netSales : number[];
  investmentRate: number; // Needed for stress test settings
  investmentRateDrop: number; // Needed for stress test settings, decimal form (e.g., 6.02% is 0.0602)
}

const CalculateStressTest2 = (data: StressData2) => {
  const stressEffects: number[] = [];

  for (let forecastedYears = 0; forecastedYears < MAX_FORECAST_SIZE; forecastedYears++) {
    const decreaseInNetSales = data.netSales[forecastedYears] * (data.investmentRate * data.investmentRateDrop);

    stressEffects.push(decreaseInNetSales);
  }

  const residualEffectData = {
    principals: stressEffects,
    annualReturnRate: ANNUAL_RETURN_RATE,
  };

  const residualEffects = calculateResidualEffects(residualEffectData);

  return {
    stressEffects,
    residualEffects,
  };
};

export default CalculateStressTest2;
