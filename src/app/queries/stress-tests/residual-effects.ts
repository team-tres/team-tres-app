interface ResidualEffectData {
  principals: number[]; // Array of principal losses per year
  annualReturnRate: number; // decimal form (e.g., 6.02% is 0.0602)
}

const calculateResidualEffects = (data: ResidualEffectData) => {
  const { principals, annualReturnRate } = data;
  const totalInterestsLost: number[] = [];
  for (let year = 1; year <= principals.length; year++) {
    let totalLoss = 0;
    for (let i = 0; i < year; i++) {
      totalLoss += principals[i] * (1 + annualReturnRate) ** (year - i) - principals[i];
    }
    totalInterestsLost.push(Math.round(totalLoss));
  }
  return totalInterestsLost;
};

const exampleData: ResidualEffectData = {
  principals: [900, 1892, 2982, 4180, 5491, 6926, 8494],
  annualReturnRate: 0.0602,
};

console.log(calculateResidualEffects(exampleData)); // REMOVE THIS LINE FOR PRODUCTION

export default calculateResidualEffects;
