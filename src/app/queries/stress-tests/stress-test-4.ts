import { FinancialCompilation } from "../financial-comp/financial-calculations";

interface StressTestParams {
  percentageIncrease: number; 
  currentAssetsChange: number; 
}

export interface StressTestResult extends FinancialCompilation {
  increaseInExpenses: number;
  newTotalOperatingExpenses: number;
  changeInCurrentAssets: number;
  newTotalCurrentAssets: number;
}

export const applyStressTest = (financialData: FinancialCompilation[], params: StressTestParams): StressTestResult[] => {
  return financialData.map((data) => {
    const increaseInExpenses = data.totalOperatingExpenses * (params.percentageIncrease / 100);
    const newTotalOperatingExpenses = data.totalOperatingExpenses + increaseInExpenses;

    const changeInCurrentAssets = params.currentAssetsChange; // Apply stress change
    const newTotalCurrentAssets = data.totalCurrentAssets + changeInCurrentAssets;

    return {
      ...data,
      increaseInExpenses,
      newTotalOperatingExpenses,
      changeInCurrentAssets,
      newTotalCurrentAssets,
    };
  });
};