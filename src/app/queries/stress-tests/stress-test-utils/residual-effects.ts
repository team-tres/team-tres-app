import { ANNUAL_RETURN_RATE } from '../../../../config/constants';

const calculateResidualEffects = (principals: number[]): number[] => {
  const totalInterestsLost: number[] = [];

  for (let year = 1; year <= principals.length; year++) {
    let totalLoss = 0;

    for (let i = 0; i < year; i++) {
      totalLoss += principals[i] * (1 + ANNUAL_RETURN_RATE) ** (year - i) - principals[i];
    }
    totalInterestsLost.push(Math.round(totalLoss));
  }
  return totalInterestsLost;
};

export default calculateResidualEffects;
