import calculatePrincipal from './stress-test-utils/principal-utils';
import generateInvestmentBalances, { InvestmentDetails } from './stress-test-utils/investment-generation';
import calculateResidualEffects from './stress-test-utils/residual-effects';
import { validateValue, validateAndClampPercentage } from '../../../utils/validation-utils';

export interface StressData {
  investmentAmount: number;
  interestRate: number;
  interestRateDrop: number;
  impactedYears: number;
  reinvestmentPercentage: number;
}

const calculateStressTest1 = ({
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

  const baselineInvestmentBalances = generateInvestmentBalances(baselineInvestmentDetails);
  const stressInvestmentBalances = generateInvestmentBalances(stressInvestmentDetails);
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

export default calculateStressTest1;
