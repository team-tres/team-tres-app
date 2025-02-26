import { calculateFinancialCompilation } from '../financial-calculations';

interface FinancialCompilation {
  year: number;
  // Needed for Income Statement values
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

  totalCurrentAssets: number;
  totalLongTermAssets: number;
  totalAssets: number;
  totalCurrentLiabilities: number;
  totalLongTermLiabilities: number;
  totalLiabilities: number;
  totalStockholdersEquity: number;
  totalLiabilitiesAndEquity: number;
}

// Data from the spreadsheet
const AuditorData2022 = {
  year: 2022,
  revenue: 131345,
  costOfContracting: 48456,
  overhead: 667,
  salariesAndBenefits: 23872,
  rentAndOverhead: 10087,
  depreciationAndAmortization: 17205,
  interest: 1500,
  interestIncome: 0,
  interestExpense: 0,
  gainOnDisposalOfAssets: 0,
  otherIncome: 0,
  incomeTaxes: 8483,
  cashAndCashEquivalents: 183715,
  accountsReceivable: 6567,
  inventory: 9825,
  propertyPlantAndEquipment: 40145,
  investment: 0,
  accountsPayable: 4912,
  currentDebtService: 5000,
  taxesPayable: 4265,
  longDebtService: 15000,
  loansPayable: 20000,
  equityCapital: 170000,
  retainedEarnings: 21075,
};

const AuditorData2023 = {
  year: 2023,
  revenue: 142341,
  costOfContracting: 52587,
  overhead: 667,
  salariesAndBenefits: 23002,
  rentAndOverhead: 10020,
  depreciationAndAmortization: 16544,
  interest: 900,
  interestIncome: 0,
  interestExpense: 0,
  gainOnDisposalOfAssets: 0,
  otherIncome: 0,
  incomeTaxes: 10908,
  cashAndCashEquivalents: 191069,
  accountsReceivable: 7117,
  inventory: 10531,
  propertyPlantAndEquipment: 38602,
  investment: 20000,
  accountsPayable: 5265,
  currentDebtService: 5000,
  taxesPayable: 5341,
  longDebtService: 15000,
  loansPayable: 40000,
  equityCapital: 170000,
  retainedEarnings: 26713,
};

const AuditorData2024 = {
  year: 2024,
  revenue: 150772,
  costOfContracting: 7539,
  overhead: 11342,
  salariesAndBenefits: 56643,
  rentAndOverhead: 667,
  depreciationAndAmortization: 25245,
  interest: 11412,
  interestIncome: 16080,
  interestExpense: 900,
  gainOnDisposalOfAssets: 0,
  otherIncome: 0,
  incomeTaxes: 11598,
  cashAndCashEquivalents: 189550,
  accountsReceivable: 7539,
  inventory: 11342,
  propertyPlantAndEquipment: 37521,
  investment: 50000,
  accountsPayable: 5671,
  currentDebtService: 5000,
  taxesPayable: 2054,
  longDebtService: 15000,
  loansPayable: 70000,
  equityCapital: 170000,
  retainedEarnings: 28227,
};

const printResults = (result: any, year: string) => {
  console.log(`\nResults for ${year}:`);
  console.log('Income Statement:');
  console.log(`netSales: ${result.netSales}`);

  console.log(`costOfGoodsSold: ${result.costOfGoodsSold}`);
  console.log(`prossProfit: ${result.grossProfit}`);
  console.log(`grossMarginPercentage: ${result.grossMarginPercentage}`);

  console.log(`totalOperatingExpenses: ${result.totalOperatingExpenses}`);
  console.log(`operatingExpensesPercentage: ${result.operatingExpensesPercentage}`);
  console.log(`profitFromOperations: ${result.profitFromOperations}`);
  console.log(`profitFromOperationsPercentage: ${result.profitFromOperationsPercentage}`);

  console.log(`totalOtherIncome: ${result.totalOtherIncome}`);
  console.log(`totalOtherIncomePercentage: ${result.totalOtherIncomePercentage}`);
  console.log(`incomeBeforeIncomeTaxes: ${result.incomeBeforeIncomeTaxes}`);
  console.log(`pre-taxIncomePercentage: ${result.pretaxIncomePercentage}`);

  console.log(`netIncome: ${result.netIncome}`);
  console.log(`netIncomePercentage: ${result.netIncomePercentage}`);

  console.log('\nBalance Sheet:');
  console.log(`totalCurrentAssets: ${result.totalCurrentAssets}`);
  console.log(`totalLong-TermAsset: ${result.totalLongTermAssets}`);
  console.log(`totalAssets: ${result.totalAssets}`);
  console.log(`totalCurrentLiabilities: ${result.totalCurrentLiabilities}`);
  console.log(`totalLong-TermLiabilities: ${result.totalLongTermLiabilities}`);
  console.log(`totalLiabilities: ${result.totalLiabilities}`);
  console.log(`totalStockholdersEquity: ${result.totalStockholdersEquity}`);
  console.log(`totalLiabilitiesAndEquity: ${result.totalLiabilitiesAndEquity}`);
};

const runMultiForecastTests = (): FinancialCompilation => {
  const result2024 = calculateFinancialCompilation(AuditorData2024);
  return result2024;
};

const runFinCompTests = () => {
  const result2022 = calculateFinancialCompilation(AuditorData2022);
  const result2023 = calculateFinancialCompilation(AuditorData2023);
  const result2024 = calculateFinancialCompilation(AuditorData2024);

  printResults(result2022, '2022');
  printResults(result2023, '2023');
  printResults(result2024, '2024');
};

export default runMultiForecastTests;
// runTests()
runFinCompTests();
