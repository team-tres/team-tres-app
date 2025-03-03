import { FinancialData } from '@/app/queries/forecasts/forecast';

export interface AuditorData {
  year: number;
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
  revenue: number,
  netSales: number,
  costOfContracting: number,
  overhead: number,
  costOfGoodsSold: number,
  grossProfit: number,
  grossMarginPercentage: number,
  salariesAndBenefits: number,
  rentAndOverhead: number,
  depreciationAndAmortization: number,
  interest: number,
  totalOperatingExpenses: number,
  operatingExpensesPercentage: number,
  profitFromOperations: number,
  profitFromOperationsPercentage: number,
  interestIncome: number,
  interestExpense: number,
  gainOnDisposalOfAssets: number,
  otherIncome: number,
  totalOtherIncome: number,
  totalOtherIncomePercentage: number,
  incomeBeforeIncomeTaxes: number,
  pretaxIncomePercentage: number,
  incomeTaxes: number,
  netIncome: number,
  netIncomePercentage: number,
  cashAndCashEquivalents: number,
  accountsReceivable: number,
  inventory: number,
  totalCurrentAssets: number,
  propertyPlantAndEquipment: number,
  investment: number,
  totalLongTermAssets: number,
  totalAssets: number,
  accountsPayable: number,
  currentDebtService: number,
  taxesPayable: number,
  totalCurrentLiabilities: number,
  longDebtService: number,
  loansPayable: number,
  totalLongTermLiabilities: number,
  totalLiabilities: number,
  equityCapital: number,
  retainedEarnings: number,
  totalStockholdersEquity: number,
  totalLiabilitiesAndEquity: number,
}

export const calculateFinancialCompilation = (data: AuditorData): FinancialCompilation => {
  let grossMarginPercentage = 0;
  let operatingExpensesPercentage = 0;
  let totalOtherIncomePercentage = 0;
  let pretaxIncomePercentage = 0;
  let profitFromOperationsPercentage = 0;
  let netIncomePercentage = 0;
  const netSales = data.revenue;
  const costOfGoodsSold = data.costOfContracting + data.overhead;
  const totalOperatingExpenses = data.salariesAndBenefits + data.rentAndOverhead
  + data.depreciationAndAmortization + data.interest;
  const totalOtherIncome = data.interestIncome + data.interestExpense
    + data.gainOnDisposalOfAssets + data.otherIncome;
  const grossProfit = netSales - costOfGoodsSold;
  const profitFromOperations = grossProfit - totalOperatingExpenses;
  const incomeBeforeIncomeTaxes = profitFromOperations + totalOtherIncome;
  const netIncome = incomeBeforeIncomeTaxes - data.incomeTaxes;
  const totalCurrentAssets = data.cashAndCashEquivalents + data.accountsReceivable + data.inventory;
  const totalLongTermAssets = data.propertyPlantAndEquipment + data.investment;
  const totalAssets = totalCurrentAssets + totalLongTermAssets;
  const totalCurrentLiabilities = data.accountsPayable + data.currentDebtService + data.taxesPayable;
  const totalLongTermLiabilities = data.longDebtService + data.loansPayable;
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;
  const totalStockholdersEquity = data.equityCapital + data.retainedEarnings;
  const totalLiabilitiesAndEquity = totalLiabilities + totalStockholdersEquity;
  if (netSales !== 0) {
    grossMarginPercentage = grossProfit / netSales;
    operatingExpensesPercentage = totalOperatingExpenses / netSales;
    totalOtherIncomePercentage = totalOtherIncome / netSales;
    pretaxIncomePercentage = incomeBeforeIncomeTaxes / netSales;
    profitFromOperationsPercentage = profitFromOperations / netSales;
    netIncomePercentage = netIncome / netSales;
  }

  const FinComp: FinancialCompilation = {
    year: data.year,
    revenue: data.revenue,
    netSales,
    costOfContracting: data.costOfContracting,
    overhead: data.overhead,
    costOfGoodsSold,
    grossProfit,
    grossMarginPercentage,
    salariesAndBenefits: data.salariesAndBenefits,
    rentAndOverhead: data.rentAndOverhead,
    depreciationAndAmortization: data.depreciationAndAmortization,
    interest: data.interest,
    totalOperatingExpenses,
    operatingExpensesPercentage,
    profitFromOperations,
    profitFromOperationsPercentage,
    interestIncome: data.interestIncome,
    interestExpense: data.interestExpense,
    gainOnDisposalOfAssets: data.gainOnDisposalOfAssets,
    otherIncome: data.otherIncome,
    totalOtherIncome,
    totalOtherIncomePercentage,
    incomeBeforeIncomeTaxes,
    pretaxIncomePercentage,
    incomeTaxes: data.incomeTaxes,
    netIncome,
    netIncomePercentage,
    cashAndCashEquivalents: data.cashAndCashEquivalents,
    accountsReceivable: data.accountsReceivable,
    inventory: data.inventory,
    totalCurrentAssets,
    propertyPlantAndEquipment: data.propertyPlantAndEquipment,
    investment: data.investment,
    totalLongTermAssets,
    totalAssets,
    accountsPayable: data.accountsPayable,
    currentDebtService: data.currentDebtService,
    taxesPayable: data.taxesPayable,
    totalCurrentLiabilities,
    longDebtService: data.longDebtService,
    loansPayable: data.loansPayable,
    totalLongTermLiabilities,
    totalLiabilities,
    equityCapital: data.equityCapital,
    retainedEarnings: data.retainedEarnings,
    totalStockholdersEquity,
    totalLiabilitiesAndEquity,
  };

  return FinComp;
};

export const processForecast = (forecast: FinancialData[]): FinancialCompilation[] => forecast.map((data) => {
  const netSales = data.revenue;
  let grossMarginPercentage = 0;
  let operatingExpensesPercentage = 0;
  let totalOtherIncomePercentage = 0;
  let pretaxIncomePercentage = 0;
  let profitFromOperationsPercentage = 0;
  let netIncomePercentage = 0;
  const costOfGoodsSold = data.costOfContracting + data.overhead;
  const totalOperatingExpenses = data.salariesAndBenefits + data.rentAndOverhead
      + data.depreciationAndAmortization + data.interest;
  const totalOtherIncome = data.interestIncome + data.interestExpense + data.gainOnDisposalOfAssets + data.otherIncome;
  const grossProfit = netSales - costOfGoodsSold;
  const incomeBeforeIncomeTaxes = data.profitFromOperations + totalOtherIncome;
  const netIncome = incomeBeforeIncomeTaxes - data.incomeTaxes;
  const totalCurrentAssets = data.cashAndCashEquivalents + data.accountsReceivable + data.inventory;
  const totalLongTermAssets = data.propertyPlantAndEquipment + data.investment;
  const totalAssets = totalCurrentAssets + totalLongTermAssets;
  const totalCurrentLiabilities = data.accountsPayable + data.currentDebtService + data.taxesPayable;
  const totalLongTermLiabilities = data.longDebtService + data.loansPayable;
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;
  const totalStockholdersEquity = data.equityCapital + data.retainedEarnings;
  const totalLiabilitiesAndEquity = totalLiabilities + totalStockholdersEquity;
  if (netSales !== 0) {
    grossMarginPercentage = grossProfit / netSales;
    operatingExpensesPercentage = totalOperatingExpenses / netSales;
    totalOtherIncomePercentage = totalOtherIncome / netSales;
    pretaxIncomePercentage = incomeBeforeIncomeTaxes / netSales;
    profitFromOperationsPercentage = data.profitFromOperations / netSales;
    netIncomePercentage = netIncome / netSales;
  }
  const processedData: FinancialCompilation = {
    year: data.year,
    revenue: data.revenue,
    netSales,
    costOfContracting: data.costOfContracting,
    overhead: data.overhead,
    costOfGoodsSold,
    grossProfit,
    grossMarginPercentage,
    salariesAndBenefits: data.salariesAndBenefits,
    rentAndOverhead: data.rentAndOverhead,
    depreciationAndAmortization: data.depreciationAndAmortization,
    interest: data.interest,
    totalOperatingExpenses,
    operatingExpensesPercentage,
    profitFromOperations: data.profitFromOperations,
    profitFromOperationsPercentage,
    interestIncome: data.interestIncome,
    interestExpense: data.interestExpense,
    gainOnDisposalOfAssets: data.gainOnDisposalOfAssets,
    otherIncome: data.otherIncome,
    totalOtherIncome,
    totalOtherIncomePercentage,
    incomeBeforeIncomeTaxes,
    pretaxIncomePercentage,
    incomeTaxes: data.incomeTaxes,
    netIncome,
    netIncomePercentage,
    cashAndCashEquivalents: data.cashAndCashEquivalents,
    accountsReceivable: data.accountsReceivable,
    inventory: data.inventory,
    totalCurrentAssets,
    propertyPlantAndEquipment: data.propertyPlantAndEquipment,
    investment: data.investment,
    totalLongTermAssets,
    totalAssets,
    accountsPayable: data.accountsPayable,
    currentDebtService: data.currentDebtService,
    taxesPayable: data.taxesPayable,
    totalCurrentLiabilities,
    longDebtService: data.longDebtService,
    loansPayable: data.loansPayable,
    totalLongTermLiabilities,
    totalLiabilities,
    equityCapital: data.equityCapital,
    retainedEarnings: data.retainedEarnings,
    totalStockholdersEquity,
    totalLiabilitiesAndEquity,
  };

  return processedData;
});
