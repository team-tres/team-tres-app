import { isValidArray, validateAndClampPercentage, validateValue } from '../../../utils/validation-utils';
import { MAX_FORECAST_SIZE } from '../../../config/constants';
import calculateResidualEffects from './stress-test-utils/residual-effects';

interface StressData2 {
  netSales : number[];
  investmentRate: number;
  investmentRateDrop: number; // decimal form (e.g., 6.02% is 0.0602)
}

const CalculateStressTest2 = ({
  netSales,
  investmentRate,
  investmentRateDrop,
}: StressData2) => {
  if (netSales.length === 0 || investmentRate === 0) {
    return {
      stressEffects: Array(MAX_FORECAST_SIZE).fill(0),
      residualEffects: Array(MAX_FORECAST_SIZE).fill(0),
    };
  }

  const stressEffects: number[] = [];

  validateValue(investmentRate, 'interestRate');
  const clampedInvestmentRateDrop = validateAndClampPercentage(investmentRateDrop);
  // The effective drop in return rate per a year
  const reducedInvestmentRate = investmentRate * clampedInvestmentRateDrop;

  isValidArray(netSales, 'number');

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
