interface StressData2 {
  netSales : number;
  investmentRate: number;
  investmentRateDrop: number; // decimal form (e.g., 6.02% is 0.0602)
}

const CalculateStressTest2 = (data: StressData2) => {
  const decreaseInNetSales = data.netSales * (data.investmentRate * data.investmentRateDrop);
  return decreaseInNetSales;
};

export default CalculateStressTest2;
