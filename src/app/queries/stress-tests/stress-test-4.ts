interface StressData4 {
    totalOperatingExpenses : number;
    percentageIncrease : number;
  }
  
  const CalculateStressTest4 = (data: StressData4) => {
    const increaseInExpenses = data.totalOperatingExpenses * data.percentageIncrease;
    const total = increaseInExpenses + data.totalOperatingExpenses;
    return increaseInExpenses;
    return total;
  };
  
  // example usage
  const sampleData2025: StressData4 = {
    totalOperatingExpenses: 52589,
    percentageIncrease: 0.025,
  };
  
  const sampleData2026: StressData4 = {
    totalOperatingExpenses: 52564,
    percentageIncrease: 0.025,
  };
  
  const sampleData2027: StressData4 = {
    totalOperatingExpenses: 52930,
    percentageIncrease: 0.025,
  };
  
  console.log(CalculateStressTest4(sampleData2025));
  console.log(CalculateStressTest4(sampleData2026));
  console.log(CalculateStressTest4(sampleData2027));
  
  export default CalculateStressTest4;