import { calculateAverageForecast, calculateMultiplierForecast } from './calculate-forecast';

export type FinancialData = {
  year: number;
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

type ForecastMethod = 'average' | 'multiplier';

type ForecastSettings = Record<keyof Omit<FinancialData, 'year'>, ForecastMethod>;

type ForecastResult = FinancialData[];

export function generateForecast(
  pastData: FinancialData[],
  settings: ForecastSettings,
  multiplierValues: Record<keyof Omit<FinancialData, 'year'>, number>,
): ForecastResult {
  const lastYear = pastData[pastData.length - 1].year;
  const forecast: ForecastResult = [];

  for (let i = 1; i <= 12; i++) {
    const year = lastYear + i;
    const forecastEntry: FinancialData = { year } as FinancialData;

    // rolling window
    const currentData = [...pastData, ...forecast];

    for (const field of Object.keys(settings) as (keyof Omit<FinancialData, 'year'>)[]) {
      const method = settings[field];

      // last 3 years
      const pastValues = currentData
        .map(entry => entry[field])
        .slice(-3);

      forecastEntry[field] = method === 'average'
        ? calculateAverageForecast(pastValues)
        : calculateMultiplierForecast(pastValues, multiplierValues[field]);
    }

    forecast.push(forecastEntry);
  }
  console.log(forecast);
  return forecast;
}

export default { generateForecast };
