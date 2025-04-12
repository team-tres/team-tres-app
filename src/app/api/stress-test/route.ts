/* eslint-disable import/order */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateForecast } from '@/app/queries/forecasts/forecast';
import { FinancialCompilation } from '@prisma/client';
import { processForecast } from '@/app/queries/financial-comp/financial-calculations';
import simulateDropInRevenueReturnRate from '@/app/queries/stress-tests/simulate-drop-in-revenue-return-rate';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { settings, multipliers, companyId } = body;

    if (
      !settings || typeof settings !== 'object'
      || !multipliers || typeof multipliers !== 'object'
      || !companyId || typeof companyId !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid settings, multipliers, or companyId format' }, { status: 400 });
    }

    const companyIdNumber = Number(companyId);
    if (Number.isNaN(companyIdNumber)) {
      return NextResponse.json({ error: 'Invalid companyId' }, { status: 300 });
    }

    // Fetch last three years
    const pastData: FinancialCompilation[] = await prisma.financialCompilation.findMany({
      where: {
        companyId: companyIdNumber,
      },
      orderBy: { year: 'asc' },
      take: 3,
    });

    if (pastData.length < 3) {
      return NextResponse.json({ error: 'Not enough historical data (need at least 3 years)' }, { status: 300 });
    }

    const forecast = generateForecast(pastData, settings, multipliers);

    const processedForecast = processForecast(forecast);

    const stressTestResult = processedForecast.map((yearForecast: any) => {
      const data = {
        netSales: yearForecast.netSales,
        investmentRate: 0.0375,
        investmentRateDrop: 0.060,
      };
      const result = simulateDropInRevenueReturnRate(data);
      console.log(`Year ${yearForecast.year}:`, result);
      return {
        year: yearForecast.year,
        stressTestResult: result,
      };
    });

    return NextResponse.json(
      {
        forecast: processedForecast,
        stressTest: stressTestResult,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Forecast API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/* Usage with Postman go to localhost:3000/api/stress-test/ on postman change to post method
    Add body to the request(copy and paste this) Method checked curr database I got first 3 year
    and the output is correct for the value:
{
  "companyId": "1",
  "settings": {
    "revenue": "multiplier",
    "costOfContracting": "average",
    "overhead": "average",
    "salariesAndBenefits": "average",
    "rentAndOverhead": "average",
    "depreciationAndAmortization": "average",
    "interest": "average",
    "profitFromOperations": "average",
    "interestIncome": "average",
    "interestExpense": "average",
    "gainOnDisposalOfAssets": "average",
    "otherIncome": "average",
    "incomeTaxes": "average",
    "cashAndCashEquivalents": "average",
    "accountsReceivable": "average",
    "inventory": "average",
    "propertyPlantAndEquipment": "average",
    "investment": "average",
    "accountsPayable": "average",
    "taxesPayable": "average",
    "currentDebtService": "average",
    "loansPayable": "average",
    "longDebtService": "average",
    "equityCapital": "average",
    "retainedEarnings": "average"
  },
  "multipliers": {
    "revenue": 0.015,
    "costOfContracting": 0,
    "overhead": 0,
    "salariesAndBenefits": 0,
    "rentAndOverhead": 0,
    "depreciationAndAmortization": 0,
    "interest": 0,
    "profitFromOperations": 0,
    "interestIncome": 0,
    "interestExpense": 0,
    "gainOnDisposalOfAssets": 0,
    "otherIncome": 0,
    "incomeTaxes": 0,
    "cashAndCashEquivalents": 0,
    "accountsReceivable": 0,
    "inventory": 0,
    "propertyPlantAndEquipment": 0,
    "investment": 0,
    "accountsPayable": 0,
    "taxesPayable": 0,
    "currentDebtService": 0,
    "loansPayable": 0,
    "longDebtService": 0,
    "equityCapital": 0,
    "retainedEarnings": 0
  }
}
*/
