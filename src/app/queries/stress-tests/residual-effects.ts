interface ResidualEffectData {
    principals: number[];  // Array of principal losses per year
    annualReturnRate: number; // 0.0602 for 6.02%
  }
  
  const calculateResidualEffects = (data: ResidualEffectData) => {
    const { principals, annualReturnRate } = data;
    const totalInterestsLost: number[] = [];
  
    for (let year = 1; year <= principals.length; year++) {
      let totalLoss = 0;
      
      for (let i = 0; i < year; i++) {
        totalLoss += principals[i] * Math.pow((1 + annualReturnRate), (year - i)) - principals[i];
      }
      
      totalInterestsLost.push(totalLoss);
    }
  
    return totalInterestsLost;
  };
  
  // Example Usage
  const exampleData: ResidualEffectData = {
    principals: [900, 1892, 2982, 4180, 5491, 6926, 8494], // Principal losses per year
    annualReturnRate: 0.0602, // 6.02%
  };
  
  console.log(calculateResidualEffects(exampleData));
  
  export default calculateResidualEffects;
  