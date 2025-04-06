import calculatePrincipal from './stress-test-utils/principal-utils';
import generateInvestmentBalances, { InvestmentDetails } from './stress-test-utils/investment-generation';
import calculateResidualEffects from './stress-test-utils/residual-effects';

export interface StressData {
  investmentAmount: number; // Needed for stress test settings
  interestRate: number; // Needed for stress test settings
  interestRateDrop: number; // Needed for stress test settings
  impactedYears: number; // Needed for stress test settings, still needs to be implemented
  reinvestmentPercentage: number; // Needed for stress test settings, still needs to be implemented
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

  const baselineInvestmentDetails: InvestmentDetails = {
    ...baseSettings,
    interestRate,
  };
  const stressInvestmentDetails: InvestmentDetails = {
    ...baseSettings,
    interestRate: interestRate * (1 - interestRateDrop),
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
