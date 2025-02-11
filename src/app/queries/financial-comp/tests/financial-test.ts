import calculateFinancialCompilation from '../financial-calculations';

// Data from the spreadsheet
const AuditorData2022 = {
  revenue: 131345,
  costOfContracting: 48456,
  overhead: 667,
  salariesAndBenefits: 23872,
  rentAndOverhead: 10087,
  depreciationAndAmortizattion: 17205,
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
  revenue: 142341,
  costOfContracting: 52587,
  overhead: 667,
  salariesAndBenefits: 23002,
  rentAndOverhead: 10020,
  depreciationAndAmortizattion: 16544,
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
  revenue: 150772,
  costOfContracting: 7539,
  overhead: 11342,
  salariesAndBenefits: 56643,
  rentAndOverhead: 667,
  depreciationAndAmortizattion: 25245,
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
  console.log(`Net Sales: ${result.netSales}`);

  console.log(`Cost of Goods Sold: ${result.costOfGoodsSold}`);
  console.log(`Gross Profit: ${result.grossProfit}`);
  console.log(`Gross Margin Percentage: ${result.grossMarginPercentage}`);

  console.log(`Total Operating Expenses: ${result.totalOperatingExpenses}`);
  console.log(`Operating Expenses Percentage: ${result.operatingExpensesPercentage}`);
  console.log(`Profit From Operations: ${result.profitFromOperations}`);
  console.log(`Profit From Operations Percentage: ${result.profitFromOperationsPercentage}`);

  console.log(`Total Other Income: ${result.totalOtherIncome}`);
  console.log(`Total Other Income Percentage: ${result.totalOtherIncomePercentage}`);
  console.log(`Income Before Income Taxes: ${result.incomeBeforeIncomeTaxes}`);
  console.log(`Pre-tax Income Percentage: ${result.pretaxIncomePercentage}`);

  console.log(`Net Income: ${result.netIncome}`);
  console.log(`Net Income Percentage: ${result.netIncomePercentage}`);

  console.log('\nBalance Sheet:');
  console.log(`Total Current Assets: ${result.totalCurrentAssets}`);
  console.log(`Total Long-Term Asset: ${result.totalLongTermAssets}`);
  console.log(`Total Assets: ${result.totalAssets}`);
  console.log(`Total Current Liabilities: ${result.totalCurrentLiabilities}`);
  console.log(`Total Long-Term Liabilities: ${result.totalLongTermLiabilities}`);
  console.log(`Total Liabilities: ${result.totalLiabilities}`);
  console.log(`Total Stockholders Equity: ${result.totalStockholdersEquity}`);
  console.log(`Total Liabilities and Equity: ${result.totalLiabilitiesAndEquity}`);
};

const runTests = () => {
  const result2022 = calculateFinancialCompilation(AuditorData2022);
  const result2023 = calculateFinancialCompilation(AuditorData2023);
  const result2024 = calculateFinancialCompilation(AuditorData2024);

  printResults(result2022, '2022');
  printResults(result2023, '2023');
  printResults(result2024, '2024');
};

runTests();
