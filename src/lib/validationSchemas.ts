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
    .positive('Revenue must be a positive number')
    .required('Revenue is required'),

  costOfContracting: Yup.number()
    .positive('Cost of Contracting must be a positive number')
    .required('Cost of Contracting is required'),

  overhead: Yup.number()
    .positive('Overhead must be a positive number')
    .required('Overhead is required'),

  salariesAndBenefits: Yup.number()
    .positive('Salaries and Benefits must be a positive number')
    .required('Salaries and Benefits are required'),

  rentAndOverhead: Yup.number()
    .positive('Rent and Overhead must be a positive number')
    .required('Rent and Overhead is required'),

  depreciationAndAmortization: Yup.number()
    .positive('Depreciation and Amortization must be a positive number')
    .required('Depreciation and Amortization is required'),

  interest: Yup.number()
    .positive('Interest must be a positive number')
    .required('Interest is required'),

  interestIncome: Yup.number()
    .min(0, 'Interest income must be 0 or a positive number')
    .required('Interest income is required'),

  interestExpense: Yup.number()
    .min(0, 'Interest Expense must be 0 or a positive number')
    .required('Interest expense is required'),

  incomeTaxes: Yup.number()
    .positive('Income Taxes of assets must be a positive number')
    .required('Income Taxes of assets is required'),

  cashAndCashEquivalents: Yup.number()
    .positive('Cash and Cash Equivalents of assets must be a positive number')
    .required('Cash and Cash Equivalents of assets is required'),

  otherIncome: Yup.number()
    .min(0, 'Other income must be 0 or a positive number')
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
    .positive('Loans Payable service must be a positive number')
    .required('Loans Payable service is required'),

  currentDebtService: Yup.number()
    .positive('Current debt service must be a positive number')
    .required('Current debt service is required'),

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
