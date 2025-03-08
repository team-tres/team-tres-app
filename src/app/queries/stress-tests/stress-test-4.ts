import { FinancialCompilation } from '../financial-comp/financial-calculations';

interface StressData4 {
  percentageIncrease: number;
  currentAssetsChange: number;
}

export interface StressTestResult4 extends FinancialCompilation {
  increaseInExpenses: number;
  newTotalOperatingExpenses: number;
  changeInCurrentAssets: number;
  newTotalCurrentAssets: number;
}

export const calculateStressTest4 = (financialData: FinancialCompilation[], params: StressData4): StressTestResult4[] => {
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
