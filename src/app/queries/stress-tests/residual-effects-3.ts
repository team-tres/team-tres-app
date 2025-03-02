interface ResidualEffectData {
  principal: number; // Principal loss per year
  annualReturnRate: number; // 0.0602 for 6.02%
  startYr: number;
  endYr: number;
}

const calculateResidualEffects3 = (data: ResidualEffectData) => {
  const { principal, annualReturnRate, startYr, endYr } = data;
  const totalInterestsLost: number[] = [];
  let currentYr = startYr;
  let yearCount = 1;

  while (currentYr <= endYr) {
    let totalLoss = 0;
    // Calculate compounding interest loss from each past year
    totalLoss += principal * (1 + annualReturnRate) ** yearCount - principal;
    totalInterestsLost.push(Math.round(totalLoss));
    currentYr++;
    yearCount++;
  }
  return totalInterestsLost;
};
  // Example Usage
const exampleData: ResidualEffectData = {
  principal: 50000, // Principal loss per year
  annualReturnRate: 0.0602, // 6.02%
  startYr: 2025,
  endYr: 2036,
};

console.log(calculateResidualEffects3(exampleData));
export default calculateResidualEffects3;
