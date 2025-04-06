import { ANNUAL_RETURN_RATE } from '../../../config/constants';
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

const calculateStressTest1 = (data: StressData) => {
  const baseSettings = {
    investmentAmount: data.investmentAmount,
    impactedYears: data.impactedYears,
    reinvestmentPercentage: data.reinvestmentPercentage,
  };

  const baselineInvestmentDetails: InvestmentDetails = {
    ...baseSettings,
    interestRate: data.interestRate,
  };
  const stressInvestmentDetails: InvestmentDetails = {
    ...baseSettings,
    interestRate: data.interestRate * (1 - data.interestRateDrop),
  };

  const baselineInvestmentBalances = generateInvestmentBalances(baselineInvestmentDetails);
  const stressInvestmentBalances = generateInvestmentBalances(stressInvestmentDetails);
  const stressEffects = calculatePrincipal(baselineInvestmentBalances, stressInvestmentBalances);

  const residualEffectData = {
    principals: stressEffects,
    annualReturnRate: ANNUAL_RETURN_RATE,
  };
  const residualEffects = calculateResidualEffects(residualEffectData);

  return {
    stressEffects,
    residualEffects,
  } as {
    stressEffects: number[];
    residualEffects: number[];
  };
};

export default calculateStressTest1;
