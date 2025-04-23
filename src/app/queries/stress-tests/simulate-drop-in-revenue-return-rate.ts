import { isValidArray, validateAndClampPercentage, validateValue } from '../../../utils/validation-utils';
import { MAX_FORECAST_SIZE } from '../../../config/constants';
import calculateResidualEffects from './stress-test-utils/residual-effects';

interface StressData2 {
  netSales : number[];
  investmentRate: number;
  investmentRateDrop: number; // decimal form (e.g., 6.02% is 0.0602)
}

/**
 * Calculates the stress test results for net sales based on the provided investment rate and its drop.
 * This function computes the decrease in net sales for each year based on a reduced investment rate
 * and then calculates the residual effects (long-term financial impact).
 *
 * This function assumes that a decrease in investment rate leads to a corresponding reduction in net sales.
 *
 * @param netSales - An array of net sales for each year. These values represent the baseline net sales
 * @param investmentRate - The initial investment rate as a decimal
 * @param investmentRateDrop - Percentage decrease in the investment rate for the stress test
 *                             This value should be in decimal form
 *
 * @returns An object containing:
 *  - stressEffects: The calculated stress effects (i.e., reduction in net sales each year)
 *  - residualEffects: The compounded residual effects based on the stress effects, representing
 *    the long-term impact of the reduced investment rate on net sales
 *
 * @throws {Error} If any of the input values are invalid, such as non-numeric values (e.g., netSales)
 */
const simulateDropInRevenueReturnRate = ({
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
    name: 'dropInRevenueReturnRate',
    stressEffects,
    residualEffects,
  } as {
    stressEffects: number[];
    residualEffects: number[];
  };
};

export default simulateDropInRevenueReturnRate;
