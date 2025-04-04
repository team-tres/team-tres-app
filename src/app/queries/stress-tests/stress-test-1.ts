import { ANNUAL_RETURN_RATE } from '@/config/constants';
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
  const baselineInvestmentDetails: InvestmentDetails = {
    investmentAmount: data.investmentAmount,
    interestRate: data.interestRate,
    impactedYears: data.impactedYears,
    reinvestmentPercentage: data.reinvestmentPercentage,
  };

  const stressInterestRate = data.interestRate * (1 - data.interestRateDrop);

  const stressInvestmentDetails: InvestmentDetails = {
    investmentAmount: data.investmentAmount,
    interestRate: stressInterestRate,
    impactedYears: data.impactedYears,
    reinvestmentPercentage: data.reinvestmentPercentage,
  };

  const baselineInvestmentBalances = generateInvestmentBalances(baselineInvestmentDetails);
  const stressInvestmentBalances = generateInvestmentBalances(stressInvestmentDetails);
  const stressEffect = calculatePrincipal(baselineInvestmentBalances, stressInvestmentBalances);

  const residualEffectData = {
    principals: stressEffect,
    annualReturnRate: ANNUAL_RETURN_RATE,
  };

  const residualEffect = calculateResidualEffects(residualEffectData);

  return {
    stressEffect,
    residualEffect,
  };
};

export default calculateStressTest1;
