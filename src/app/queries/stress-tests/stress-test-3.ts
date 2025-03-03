interface StressData3 {
  // Needed for Stress Test 3 values
  newExpenses: number;
  totalAssets: number;
  totalExpenses: number;
// years: number;
}

const CalculateStressTest3 = (data: StressData3) => {
  const total = data.totalAssets - data.newExpenses;
  const totalExpenses = data.totalExpenses + data.newExpenses;
  return { total, totalExpenses };
};

const sampleData2025: StressData3 = {
  totalAssets: 205752,
  newExpenses: 50000,
  totalExpenses: 52589,
};

const sampleData2026: StressData3 = {
  totalAssets: 207633,
  newExpenses: 50000,
  totalExpenses: 52564,
};

const sampleData2027: StressData3 = {
  totalAssets: 207272,
  newExpenses: 50000,
  totalExpenses: 52930,
};

console.log(CalculateStressTest3(sampleData2025));
console.log(CalculateStressTest3(sampleData2026));
console.log(CalculateStressTest3(sampleData2027));

export default CalculateStressTest3;
