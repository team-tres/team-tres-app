import * as Yup from 'yup';

export const FinancialCompilationSchema = Yup.object({

  year: Yup.number()
    .positive('Year must be a positive number')
    .required('Year is required'),
  userId: Yup.number()
    .positive('User Id must be a positive number')
    .required('User ID is required'),

  gainOnDisposalOfAssets: Yup.number()
    .positive('gainOnDisposalOfAssets must be a positive number')
    .required('gainOnDisposalOfAssets is required'),

  income: Yup.number()
    .positive('Income must be a positive number')
    .required('Income is required'),

  expenses: Yup.number()
    .positive('Expenses must be a positive number')
    .required('Expenses are required'),

  revenue: Yup.number()
    .positive('Revenue must be a positive number')
    .required('Revenue is required'),

  costOfContracting: Yup.number()
    .positive('Cost of contracting must be a positive number')
    .required('Cost of contracting is required'),

  overhead: Yup.number()
    .positive('Overhead must be a positive number')
    .required('Overhead is required'),

  salariesAndBenefits: Yup.number()
    .positive('Salaries and benefits must be a positive number')
    .required('Salaries and benefits are required'),

  rentAndOverhead: Yup.number()
    .positive('Rent and overhead must be a positive number')
    .required('Rent and overhead is required'),

  depreciationAndAmortization: Yup.number()
    .positive('Depreciation and amortization must be a positive number')
    .required('Depreciation and amortization is required'),

  interest: Yup.number()
    .positive('Interest must be a positive number')
    .required('Interest is required'),

  interestIncome: Yup.number()
    .positive('Interest income must be a positive number')
    .required('Interest income is required'),

  interestExpense: Yup.number()
    .positive('Interest expense must be a positive number')
    .required('Interest expense is required'),

  gainOnDisposalAssets: Yup.number()
    .positive('Gain on disposal of assets must be a positive number')
    .required('Gain on disposal of assets is required'),

  incomeTaxes: Yup.number()
    .positive('incomeTaxes of assets must be a positive number')
    .required('incomeTaxes of assets is required'),

  cashAndCashEquivalents: Yup.number()
    .positive('cashAndCashEquivalents of assets must be a positive number')
    .required('cashAndCashEquivalents of assets is required'),

  otherIncome: Yup.number()
    .positive('Other income must be a positive number')
    .required('Other income is required'),

  accountsReceivable: Yup.number()
    .positive('Accounts receivable must be a positive number')
    .required('Accounts receivable is required'),

  inventory: Yup.number()
    .positive('Inventory must be a positive number')
    .required('Inventory is required'),

  propertyPlantAndEquipment: Yup.number()
    .positive('Property, plant, and equipment must be a positive number')
    .required('Property, plant, and equipment is required'),

  investment: Yup.number()
    .positive('Investment must be a positive number')
    .required('Investment is required'),

  accountsPayable: Yup.number()
    .positive('accountsPayable must be a positive number')
    .required('accountsPayable is required'),

  taxesPayable: Yup.number()
    .positive('taxesPayable must be a positive number')
    .required('taxesPayable is required'),

  longDebtService: Yup.number()
    .positive('Long debt service must be a positive number')
    .required('Long debt service is required'),

  loansPayable: Yup.number()
    .positive('loansPayable service must be a positive number')
    .required('loansPayable service is required'),

  currentDebtService: Yup.number()
    .positive('Current debt service must be a positive number')
    .required('Current debt service is required'),

  loanPayable: Yup.number()
    .positive('Loan payable must be a positive number')
    .required('Loan payable is required'),

  equityCapital: Yup.number()
    .positive('Equity capital must be a positive number')
    .required('Equity capital is required'),

  retainedEarnings: Yup.number()
    .positive('Retained earnings must be a positive number')
    .required('Retained earnings is required'),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});
