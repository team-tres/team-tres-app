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

  // Needed for Stress Test 1 values
  presentBalance: number;
  interestRate: number;
  term: number; // in years
  monthlyContribution: number;
  annualReturnRate: number;


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

  // Calculating stress test 1 values;
  const interestEarned = data.presentBalance * data.interestRate;
  const newBalance = data.presentBalance + interestEarned;
  const test1interest = data.interestRate * .7;
  const test1interestEarned = test1interest * data.presentBalance;
  const test1Balance = test1interestEarned + data.presentBalance;
  const principal = newBalance - test1Balance; 

  //year 1
  const year1totalInterestLost = (principal * (1 + data.annualReturnRate)) - principal;
  const year1sum1 = year1totalInterestLost;

  
  


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

    // Stress test 1 values
    interestEarned,
    newBalance,
    test1interest,
    test1interestEarned,
    test1Balance,
    principal
  };
};

export default calculateFinancialCompilation;
