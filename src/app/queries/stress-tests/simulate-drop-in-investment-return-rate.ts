import calculatePrincipal from './stress-test-utils/principal-utils';
import simulateInvestmentBalances, { InvestmentDetails } from './stress-test-utils/simulate-investment-balances';
import calculateResidualEffects from './stress-test-utils/residual-effects';
import { validateValue, validateAndClampPercentage } from '../../../utils/validation-utils';

export interface StressData {
  investmentAmount: number;
  interestRate: number;
  interestRateDrop: number;
  impactedYears: number;
  reinvestmentPercentage: number;
}

/**
 * Calculates the stress test results based on the investment amount, interest rate, interest rate drop,
 * impacted years, and reinvestment percentage. The function evaluates the difference in balances between
 * baseline and stress test scenarios, and computes the residual effects for each year.
 *
 * This function considers a baseline scenario with an initial interest rate and a stress test scenario
 * where the interest rate is reduced by a specified percentage.
 *
 * @param investmentAmount - Total investment amount
 * @param interestRate - Initial interest rate of the investment, represented in decimal form
 * @param interestRateDrop - Percentage decrease in the interest rate for the stress test, represented in
 *                           decimal form
 * @param impactedYears - Number of years for which the investment is considered
 * @param reinvestmentPercentage - Percentage of interest to be reinvested, represented in decimal form
 *
 * @returns An object containing:
 *  - stressEffects: Calculated stress effects (difference between the baseline and stress test balances)
 *  - residualEffects: Compounded residual effects based on the stress effects, represents the long-term
 *    financial impact
 *
 * @throws {Error} If any of the input values are invalid (e.g., investmentAmount, interestRate, etc.)
 */
const simulateDropInInvestmentReturnRate = ({
  investmentAmount,
  interestRate,
  interestRateDrop,
  impactedYears,
  reinvestmentPercentage,
} : StressData) => {
  const baseSettings = {
    investmentAmount,
    impactedYears,
    reinvestmentPercentage,
  };
  validateValue(interestRate, 'interestRate');
  const clampedInterestRateDrop = validateAndClampPercentage(interestRateDrop);

  const stressInvestmentDetails: InvestmentDetails = {
    ...baseSettings,
    interestRate: interestRate * (1 - clampedInterestRateDrop),
  };
  const baselineInvestmentDetails: InvestmentDetails = {
    ...baseSettings,
    interestRate,
  };

  const baselineInvestmentBalances = simulateInvestmentBalances(baselineInvestmentDetails);
  const stressInvestmentBalances = simulateInvestmentBalances(stressInvestmentDetails);
  const stressEffects = calculatePrincipal(baselineInvestmentBalances, stressInvestmentBalances);

  const residualEffects = calculateResidualEffects(stressEffects);

  return {
    stressEffects,
    residualEffects,
  } as {
    stressEffects: number[];
    residualEffects: number[];
  };
};

export default simulateDropInInvestmentReturnRate;
