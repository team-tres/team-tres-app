import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string()
    .required('Company name is required'),

  quantity: Yup.number()
    .positive('Quantity must be a positive number')
    .required('Quantity is required'),

  owner: Yup.string()
    .required('Owner is required'),

  income: Yup.number()
    .positive('Income must be a positive number')
    .required('Income is required'),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddFinancialCompilationSchema = Yup.object({
  companyId: Yup.number()
    .required('Company ID is required'),

  year: Yup.number()
    .positive('Year must be a positive number')
    .required('Year is required'),

  // Income Statement
  revenue: Yup.number()
    .required('Revenue is required'),

  netSales: Yup.number()
    .required('Net sales is required'),

  costOfContracting: Yup.number()
    .required('Cost of contracting is required'),

  overhead: Yup.number()
    .required('Overhead is required'),

  costOfGoodsSold: Yup.number()
    .required('Cost of goods sold is required'),

  grossProfit: Yup.number()
    .required('Gross profit is required'),

  grossMarginPercentage: Yup.number()
    .min(0, 'Percentage cannot be negative')
    .max(100, 'Percentage cannot exceed 100')
    .required('Gross margin percentage is required'),

  salariesAndBenefits: Yup.number()
    .required('Salaries and benefits are required'),

  rentAndOverhead: Yup.number()
    .required('Rent and overhead is required'),

  depreciationAndAmortization: Yup.number()
    .required('Depreciation and amortization is required'),

  interest: Yup.number()
    .required('Interest is required'),

  totalOperatingExpenses: Yup.number()
    .required('Total operating expenses is required'),

  operatingExpensesPercentage: Yup.number()
    .min(0, 'Percentage cannot be negative')
    .max(100, 'Percentage cannot exceed 100')
    .required('Operating expenses percentage is required'),

  profitFromOperations: Yup.number()
    .required('Profit from operations is required'),

  profitFromOperationsPercentage: Yup.number()
    .min(0, 'Percentage cannot be negative')
    .max(100, 'Percentage cannot exceed 100')
    .required('Profit from operations percentage is required'),

  interestIncome: Yup.number()
    .required('Interest income is required'),

  interestExpense: Yup.number()
    .required('Interest expense is required'),

  gainOnDisposalOfAssets: Yup.number()
    .required('Gain on disposal of assets is required'),

  otherIncome: Yup.number()
    .required('Other income is required'),

  totalOtherIncome: Yup.number()
    .required('Total other income is required'),

  totalOtherIncomePercentage: Yup.number()
    .min(0, 'Percentage cannot be negative')
    .max(100, 'Percentage cannot exceed 100')
    .required('Total other income percentage is required'),

  incomeBeforeIncomeTaxes: Yup.number()
    .required('Income before income taxes is required'),

  pretaxIncomePercentage: Yup.number()
    .min(0, 'Percentage cannot be negative')
    .max(100, 'Percentage cannot exceed 100')
    .required('Pretax income percentage is required'),

  incomeTaxes: Yup.number()
    .required('Income taxes is required'),

  netIncome: Yup.number()
    .required('Net income is required'),

  netIncomePercentage: Yup.number()
    .min(0, 'Percentage cannot be negative')
    .max(100, 'Percentage cannot exceed 100')
    .required('Net income percentage is required'),

  // Balance Sheet
  cashAndCashEquivalents: Yup.number()
    .required('Cash and cash equivalents is required'),

  accountsReceivable: Yup.number()
    .required('Accounts receivable is required'),

  inventory: Yup.number()
    .required('Inventory is required'),

  totalCurrentAssets: Yup.number()
    .required('Total current assets is required'),

  propertyPlantAndEquipment: Yup.number()
    .required('Property, plant, and equipment is required'),

  investment: Yup.number()
    .required('Investment is required'),

  totalLongTermAsset: Yup.number()
    .required('Total long term asset is required'),

  accountsPayable: Yup.number()
    .required('Accounts payable is required'),

  longDebtService: Yup.number()
    .required('Long debt service is required'),

  taxesPayable: Yup.number()
    .required('Taxes payable is required'),

  totalCurrentLiabilities: Yup.number()
    .required('Total current liabilities is required'),

  currentDebtService: Yup.number()
    .required('Current debt service is required'),

  loansPayable: Yup.number()
    .required('Loans payable is required'),

  totalLongTermLiabilities: Yup.number()
    .required('Total long term liabilities is required'),

  totalLiabilities: Yup.number()
    .required('Total liabilities is required'),

  equityCapital: Yup.number()
    .required('Equity capital is required'),

  retainedEarnings: Yup.number()
    .required('Retained earnings is required'),

  totalStockholdersEquity: Yup.number()
    .required('Total stockholders equity is required'),

  totalLiabilitiesAndEquity: Yup.number()
    .required('Total liabilities and equity is required'),
});
