import { MAX_FORECAST_SIZE } from '../../../config/constants';
import calculateResidualEffects from './stress-test-utils/residual-effects';

interface StressData2 {
  netSales : number[];
  investmentRate: number; // Needed for stress test settings
  investmentRateDrop: number; // Needed for stress test settings, decimal form (e.g., 6.02% is 0.0602)
}

const CalculateStressTest2 = ({
  netSales, // Needed for stress test settings
  investmentRate, // Needed for stress test settings
  investmentRateDrop, // Needed for stress test settings
}: StressData2) => {
  // Handle no stress test affect applied early
  if (netSales.length === 0 || investmentRateDrop === 0 || investmentRateDrop >= 1) {
    return {
      stressEffects: [],
      residualEffects: [],
    };
  }

  const stressEffects: number[] = [];
  // The effective drop in return rate per a year
  const reducedInvestmentRate = investmentRate * investmentRateDrop;

  for (let forecastedYears = 0; forecastedYears < MAX_FORECAST_SIZE; forecastedYears++) {
    const netSale = netSales[forecastedYears] ?? 0;
    const decreaseInNetSales = netSale * reducedInvestmentRate;

    stressEffects.push(decreaseInNetSales);
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

export default CalculateStressTest2;
