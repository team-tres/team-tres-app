import generateForecast from '../forecast';

const FinancialData2022 = {
  revenue: 131345,
  costOfContracting: 48456,
  overhead: 667,
  salariesAndBenefits: 23872,
  rentAndOverhead: 10087,
  depreciationAndAmortization: 17205,
  interest: 1500,
  profitFromOperations: 29558,
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

const FinancialData2023 = {
  revenue: 142341,
  costOfContracting: 52587,
  overhead: 667,
  salariesAndBenefits: 23002,
  rentAndOverhead: 11020,
  depreciationAndAmortization: 16544,
  interest: 900,
  profitFromOperations: 37621,
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

const FinancialData2024 = {
  revenue: 150772,
  costOfContracting: 56643,
  overhead: 667,
  salariesAndBenefits: 25245,
  rentAndOverhead: 11412,
  depreciationAndAmortization: 16080,
  interest: 900,
  profitFromOperations: 39825,
  interestIncome: 0,
  interestExpense: 0,
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

const pastData = [
  { year: 2022, ...FinancialData2022 },
  { year: 2023, ...FinancialData2023 },
  { year: 2024, ...FinancialData2024 },
];

// Define the ForecastMethod type
type ForecastMethod = 'average' | 'multiplier';

// Define the ForecastSettings interface
interface ForecastSettings {
  revenue: ForecastMethod;
  costOfContracting: ForecastMethod;
  overhead: ForecastMethod;
  salariesAndBenefits: ForecastMethod;
  rentAndOverhead: ForecastMethod;
  depreciationAndAmortization: ForecastMethod;
  interest: ForecastMethod;
  profitFromOperations: ForecastMethod;
  interestIncome: ForecastMethod;
  interestExpense: ForecastMethod;
  gainOnDisposalOfAssets: ForecastMethod;
  otherIncome: ForecastMethod;
  incomeTaxes: ForecastMethod;
  cashAndCashEquivalents: ForecastMethod;
  accountsReceivable: ForecastMethod;
  inventory: ForecastMethod;
  propertyPlantAndEquipment: ForecastMethod;
  investment: ForecastMethod;
  accountsPayable: ForecastMethod;
  taxesPayable: ForecastMethod;
  currentDebtService: ForecastMethod;
  loansPayable: ForecastMethod;
  longDebtService: ForecastMethod;
  equityCapital: ForecastMethod;
  retainedEarnings: ForecastMethod;
}

// Example of creating forecast settings
const settings: ForecastSettings = {
  revenue: 'multiplier',
  costOfContracting: 'average',
  overhead: 'average',
  salariesAndBenefits: 'average',
  rentAndOverhead: 'average',
  depreciationAndAmortization: 'average',
  interest: 'average',
  profitFromOperations: 'average',
  interestIncome: 'average',
  interestExpense: 'average',
  gainOnDisposalOfAssets: 'average',
  otherIncome: 'average',
  incomeTaxes: 'average',
  cashAndCashEquivalents: 'average',
  accountsReceivable: 'average',
  inventory: 'average',
  propertyPlantAndEquipment: 'average',
  investment: 'average',
  accountsPayable: 'average',
  taxesPayable: 'average',
  currentDebtService: 'average',
  loansPayable: 'average',
  longDebtService: 'average',
  equityCapital: 'average',
  retainedEarnings: 'average',
};

type FinancialData = {
  revenue: number;
  costOfContracting: number;
  overhead: number;
  salariesAndBenefits: number;
  rentAndOverhead: number;
  depreciationAndAmortization: number;
  interest: number;
  profitFromOperations: number;
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
};

const multiplierValues: Record<keyof Omit<FinancialData, 'year'>, number> = {
  revenue: 0.015,
  costOfContracting: 0,
  overhead: 0,
  salariesAndBenefits: 0,
  rentAndOverhead: 0,
  depreciationAndAmortization: 0,
  interest: 0,
  profitFromOperations: 0,
  interestIncome: 0,
  interestExpense: 0,
  gainOnDisposalOfAssets: 0,
  otherIncome: 0,
  incomeTaxes: 0,
  cashAndCashEquivalents: 0,
  accountsReceivable: 0,
  inventory: 0,
  propertyPlantAndEquipment: 0,
  investment: 0,
  accountsPayable: 0,
  taxesPayable: 0,
  currentDebtService: 0,
  loansPayable: 0,
  longDebtService: 0,
  equityCapital: 0,
  retainedEarnings: 0,
};

const forecastResult = generateForecast(pastData, settings, multiplierValues);

console.log('Forecast Results:', forecastResult);
