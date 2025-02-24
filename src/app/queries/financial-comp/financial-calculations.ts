export interface AuditorData {
  year: number;
  // Basic Income Statement values
  revenue: number;
  costOfContracting: number;
  overhead: number;
  salariesAndBenefits: number;
  rentAndOverhead: number;
  depreciationAndAmortization: number;
  interest: number;
  interestIncome: number;
  interestExpense: number;
  gainOnDisposalOfAssets: number;
  otherIncome: number;
  incomeTaxes: number;

  // Basic Balance Sheet values
  // Basic Balance Sheet values
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

export interface FinancialCompilation {
  year: number;
  // Income Statement values
  revenue: number;
  costOfContracting: number;
  overhead: number;
  salariesAndBenefits: number;
  rentAndOverhead: number;
  depreciationAndAmortization: number;
  interest: number;
  interestIncome: number;
  interestExpense: number;
  gainOnDisposalOfAssets: number;
  otherIncome: number;
  incomeTaxes: number;
  netSales: number;
  costOfGoodsSold: number;
  totalOperatingExpenses: number;
  totalOtherIncome: number;
  grossProfit: number;
  grossMarginPercentage: number;
  operatingExpensesPercentage: number;
  totalOtherIncomePercentage: number;
  profitFromOperations: number;
  incomeBeforeIncomeTaxes: number;
  pretaxIncomePercentage : number;
  netIncome: number;
  profitFromOperationsPercentage: number;
  netIncomePercentage: number;

  // Balance Sheet values
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
  totalCurrentAssets: number;
  totalLongTermAssets: number;
  totalAssets: number;
  totalCurrentLiabilities: number;
  totalLongTermLiabilities: number;
  totalLiabilities: number;
  totalStockholdersEquity: number;
  totalLiabilitiesAndEquity: number;
}

// Function to calculate Financial Compilation data
export const calculateFinancialCompilation = (data: AuditorData): FinancialCompilation => {
  // Calculating Income Statement values
  const netSales = data.revenue;
  const costOfGoodsSold = data.costOfContracting + data.overhead;
  const totalOperatingExpenses = data.salariesAndBenefits + data.rentAndOverhead
  + data.depreciationAndAmortization + data.interest;
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

  const FinComp: FinancialCompilation = {
    year: data.year,
    // Income Statement Values
    revenue: data.revenue,
    costOfContracting: data.costOfContracting,
    overhead: data.overhead,
    salariesAndBenefits: data.salariesAndBenefits,
    rentAndOverhead: data.rentAndOverhead,
    depreciationAndAmortization: data.depreciationAndAmortization,
    interest: data.interest,
    interestIncome: data.interestIncome,
    interestExpense: data.interestExpense,
    gainOnDisposalOfAssets: data.gainOnDisposalOfAssets,
    otherIncome: data.otherIncome,
    incomeTaxes: data.incomeTaxes,
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
    cashAndCashEquivalents: data.cashAndCashEquivalents,
    accountsReceivable: data.accountsReceivable,
    inventory: data.inventory,
    propertyPlantAndEquipment: data.propertyPlantAndEquipment,
    investment: data.investment,
    accountsPayable: data.accountsPayable,
    taxesPayable: data.taxesPayable,
    currentDebtService: data.currentDebtService,
    loansPayable: data.loansPayable,
    longDebtService: data.longDebtService,
    equityCapital: data.equityCapital,
    retainedEarnings: data.retainedEarnings,
    totalCurrentAssets,
    totalLongTermAssets,
    totalAssets,
    totalCurrentLiabilities,
    totalLongTermLiabilities,
    totalLiabilities,
    totalStockholdersEquity,
    totalLiabilitiesAndEquity,
  };

  return FinComp;
};
