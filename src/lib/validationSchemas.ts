import * as Yup from 'yup';

export const FinancialCompilationSchema = Yup.object({

  year: Yup.number()
    .positive('Year must be a positive number')
    .required('Year is required'),

  userId: Yup.number()
    .positive('User Id must be a positive number')
    .required('User ID is required'),

  gainOnDisposalOfAssets: Yup.number()
    .min(0, 'Gain on Disposal of Assets must be 0 or a positive number')
    .required('Gain on Disposal of Assets is required'),

  revenue: Yup.number()
    .min(0, 'Revenue must be 0 or a positive number')
    .required('Revenue is required'),

  costOfContracting: Yup.number()
    .min(0, 'Cost of Contracting must be 0 or a positive number')
    .required('Cost of Contracting is required'),

  overhead: Yup.number()
    .min(0, 'Overhead must be 0 or a positive number')
    .required('Overhead is required'),

  salariesAndBenefits: Yup.number()
    .min(0, 'Salaries and Benefits must be 0 or a positive number')
    .required('Salaries and Benefits are required'),

  rentAndOverhead: Yup.number()
    .min(0, 'Rent and Overhead must be 0 or a positive number')
    .required('Rent and Overhead is required'),

  depreciationAndAmortization: Yup.number()
    .min(0, 'Depreciation and Amortization must be 0 or a positive number')
    .required('Depreciation and Amortization is required'),

  interest: Yup.number()
    .min(0, 'Interest must be 0 or a positive number')
    .required('Interest is required'),

  interestIncome: Yup.number()
    .min(0, 'Interest income must be 0 or a positive number')
    .required('Interest income is required'),

  interestExpense: Yup.number()
    .min(0, 'Interest Expense must be 0 or a positive number')
    .required('Interest expense is required'),

  incomeTaxes: Yup.number()
    .min(0, 'Income Taxes must be 0 or a positive number')
    .required('Income Taxes is required'),

  cashAndCashEquivalents: Yup.number()
    .min(0, 'Cash and Cash Equivalents must be 0 or a positive number')
    .required('Cash and Cash Equivalents is required'),

  otherIncome: Yup.number()
    .min(0, 'Other income must be 0 or a positive number')
    .required('Other income is required'),

  accountsReceivable: Yup.number()
    .min(0, 'Accounts receivable must be 0 or a positive number')
    .required('Accounts receivable is required'),

  inventory: Yup.number()
    .min(0, 'Inventory must be 0 or a positive number')
    .required('Inventory is required'),

  propertyPlantAndEquipment: Yup.number()
    .min(0, 'Property, Plant, and Equipment must be 0 or a positive number')
    .required('Property, Plant, and Equipment is required'),

  investment: Yup.number()
    .min(0, 'Investment be 0 or a positive number')
    .required('Investment is required'),

  accountsPayable: Yup.number()
    .min(0, 'Accounts Payable must be 0 or a positive number')
    .required('Accounts Payable is required'),

  taxesPayable: Yup.number()
    .min(0, 'Taxes Payable must be 0 or a positive number')
    .required('Taxes Payable is required'),

  longDebtService: Yup.number()
    .min(0, 'Long debt service must be 0 or a positive number')
    .required('Long debt service is required'),

  loansPayable: Yup.number()
    .min(0, 'Loans Payable must be 0 or a positive number')
    .required('Loans Payable service is required'),

  currentDebtService: Yup.number()
    .min(0, 'Current debt service must be 0 or a positive number')
    .required('Current debt service is required'),

  equityCapital: Yup.number()
    .min(0, 'Equity Capital must be 0 or a positive number')
    .required('Equity capital is required'),

  retainedEarnings: Yup.number()
    .min(0, 'Retained Earnings must be 0 or a positive number')
    .required('Retained earnings is required'),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});
