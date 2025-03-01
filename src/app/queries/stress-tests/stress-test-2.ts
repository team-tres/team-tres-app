interface StressData2 {
  netSales : number;
  percentDecrease: number; // in decimal form
}

const CalculateStressTest2 = (data: StressData2) => {
  const decreaseInRevenue = data.netSales * data.percentDecrease;
  return decreaseInRevenue;
};
// Example Usage
const sampleData2025: StressData2 = {
  netSales: 141486,
  percentDecrease: 0.0225,
};

const sampleData2026: StressData2 = {
  netSales: 144866,
  percentDecrease: 0.0225,
};

const sampleData2027: StressData2 = {
  netSales: 145708,
  percentDecrease: 0.0225,
};

console.log(CalculateStressTest2(sampleData2025));
console.log(CalculateStressTest2(sampleData2026));
console.log(CalculateStressTest2(sampleData2027));

export default CalculateStressTest2;


