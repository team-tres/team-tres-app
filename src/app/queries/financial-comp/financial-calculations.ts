interface AuditorData {
  // Needed for Income Statement values
  revenue: number;
  costOfContracting: number;
  overhead: number;
  salariesAndBenefits: number;
  rentAndOverhead: number;
  depreciationAndAmortizattion: number;
  interest: number;
  interestIncome: number;
  interestExpense: number;
  gainOnDisposalOfAssets: number;
  otherIncome: number;
  incomeTaxes: number;

  // Needed for Balance Sheet values
  cashAndCashEquivalents: number;
  accountsReceivable: number;
  inventory: number;
  propertyPlantAndEquipment: number;
  investment: number;
  accountsPayable: number;
  taxesPayable: number;
  currentDebtService: number;
  loansPayable: number;
  longDebtService: number;
  equityCapital: number;
  retainedEarnings: number;
}

// Function to calculate Financial Compilation data
const calculateFinancialCompilation = (data: AuditorData) => {
  // Calculating Income Statement values
  const netSales = data.revenue;
  const costOfGoodsSold = data.costOfContracting + data.overhead;
  const totalOperatingExpenses = data.salariesAndBenefits + data.rentAndOverhead
  + data.depreciationAndAmortizattion + data.interest;
  const totalOtherIncome = data.interestIncome + data.interestExpense + data.gainOnDisposalOfAssets + data.otherIncome;
  const grossProfit = netSales - costOfGoodsSold;
  const grossMarginPercentage = grossProfit / netSales;
  const operatingExpensesPercentage = totalOperatingExpenses / netSales;
  const totalOtherIncomePercentage = totalOtherIncome / netSales;
  const profitFromOperations = grossProfit - totalOperatingExpenses;
  const incomeBeforeIncomeTaxes = profitFromOperations + totalOtherIncome;
  const pretaxIncomePercentage = incomeBeforeIncomeTaxes / netSales;
  const netIncome = incomeBeforeIncomeTaxes - data.incomeTaxes;
  const profitFromOperationsPercentage = profitFromOperations / netSales;
  const netIncomePercentage = netIncome / netSales;

  // Calculating Balance Sheet values
  const totalCurrentAssets = data.cashAndCashEquivalents + data.accountsReceivable + data.inventory;
  const totalLongTermAssets = data.propertyPlantAndEquipment + data.investment;
  const totalAssets = totalCurrentAssets + totalLongTermAssets;
  const totalCurrentLiabilities = data.accountsPayable + data.currentDebtService + data.taxesPayable;
  const totalLongTermLiabilities = data.longDebtService + data.loansPayable;
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;
  const totalStockholdersEquity = data.equityCapital + data.retainedEarnings;
  const totalLiabilitiesAndEquity = totalLiabilities + totalStockholdersEquity;

  return {
    // Income Statement values
    netSales,
    costOfGoodsSold,
    totalOperatingExpenses,
    totalOtherIncome,
    grossProfit,
    grossMarginPercentage,
    operatingExpensesPercentage,
    totalOtherIncomePercentage,
    profitFromOperations,
    incomeBeforeIncomeTaxes,
    pretaxIncomePercentage,
    netIncome,
    profitFromOperationsPercentage,
    netIncomePercentage,

    // Balance Sheet values
    totalCurrentAssets,
    totalLongTermAssets,
    totalAssets,
    totalCurrentLiabilities,
    totalLongTermLiabilities,
    totalLiabilities,
    totalStockholdersEquity,
    totalLiabilitiesAndEquity,
  };
};

export default calculateFinancialCompilation;
