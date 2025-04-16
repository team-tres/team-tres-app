/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import simulateDropInInvestmentReturnRate from '@/app/queries/stress-tests/simulate-drop-in-investment-return-rate';
import simulateDropInInvestmentReturnRate from '@/app/queries/stress-tests/simulate-drop-in-investment-return-rate';
import simulateDropInRevenueReturnRate from '@/app/queries/stress-tests/simulate-drop-in-revenue-return-rate';
import simulateOneTimeEventExpense from '@/app/queries/stress-tests/simulate-one-time-event-expense';
import simulateIncreaseInOperatingExpenses from '@/app/queries/stress-tests/simulate-increase-in-operating-expenses';
import simulateDecreaseInBondReturn from '@/app/queries/stress-tests/simulate-decrease-in-bond-return';

export interface StressTestRequest {
  companyId: string;
  settings: any;
  multipliers: any;
  stressTests: {
    simulateDropInInvestmentReturnRate?: any;
    simulateDropInRevenueReturnRate?: any;
    simulateOneTimeEventExpense?: any;
    simulateIncreaseInOperatingExpenses?: any;
    simulateDecreaseInBondReturn?: any;
  };
}
import simulateOneTimeEventExpense from '@/app/queries/stress-tests/simulate-one-time-event-expense';
import simulateIncreaseInOperatingExpenses from '@/app/queries/stress-tests/simulate-increase-in-operating-expenses';
import simulateDecreaseInBondReturn from '@/app/queries/stress-tests/simulate-decrease-in-bond-return';

export interface StressTestRequest {
  companyId: string;
  settings: any;
  multipliers: any;
  stressTests: {
    simulateDropInInvestmentReturnRate?: any;
    simulateDropInRevenueReturnRate?: any;
    simulateOneTimeEventExpense?: any;
    simulateIncreaseInOperatingExpenses?: any;
    simulateDecreaseInBondReturn?: any;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { stressTests, companyId }: StressTestRequest = body;

    if (!stressTests) {
      return NextResponse.json({ error: 'Invalid or missing stressTests data' }, { status: 400 });
    }

    const results: any[] = [];

    const getMissingData = async (testName: string, companyId: string) => {
      if (testName === 'simulateDropInInvestmentReturnRate') {
        const stressEffectData = await prisma.stressEffect.findUnique({
          where: { companyId },
          select: {
            investmentAmount: true,
            interestRate: true,
            interestRateDrop: true,
            impactedYears: true,
            reinvestmentPercentage: true,
          },
        });
        return stressEffectData || {};
      }

      if (testName === 'simulateDropInRevenueReturnRate') {
        const revenueReturnDrop = await prisma.stressEffect.findUnique({
          where: { companyId },
          select: {
            investmentRate: true,
            investmentRateDrop: true,
          },
        });
        return revenueReturnDrop || {};
      }

      if (testName === 'simulateOneTimeEventExpense') {
        const expenseData = await prisma.stressEffect.findUnique({
          where: { companyId },
          select: {
            expense: true,
            eventYear: true
          },
        });
        return expenseData || {};
      }

      if (testName === 'simulateIncreaseInOperatingExpenses') {
        const operatingExpenseIncrease = await prisma.stressEffect.findUnique({
          where: { companyId },
          select: {
            increasePercentage: true,
          },
        });
        return operatingExpenseIncrease || {};
      }

      if (testName === 'simulateDecreaseInBondReturn') {
        const bondReturnData = await prisma.stressEffect.findUnique({
          where: { companyId },
          select: {
            loanAmount: true,
            loanPeriod: true,
            baselineInterestRate: true,
            stressTestInterestRate: true
          },
        });
        return bondReturnData || {};
      }

      return {};
    };

    if (stressTests.simulateDropInInvestmentReturnRate) {
      const params = stressTests.simulateDropInInvestmentReturnRate;
      const finalParams = params || await getMissingData('simulateDropInInvestmentReturnRate', companyId);
      results.push(await simulateDropInInvestmentReturnRate(finalParams));
    }

    if (stressTests.simulateDropInRevenueReturnRate) {
      const params = stressTests.simulateDropInRevenueReturnRate;
      const finalParams = params || await getMissingData('simulateDropInRevenueReturnRate', companyId);
      results.push(await simulateDropInRevenueReturnRate(finalParams));
    }

    if (stressTests.simulateOneTimeEventExpense) {
      const params = stressTests.simulateOneTimeEventExpense;
      const finalParams = params || await getMissingData('simulateOneTimeEventExpense', companyId);
      results.push(await simulateOneTimeEventExpense(finalParams));
    }

    if (stressTests.simulateIncreaseInOperatingExpenses) {
      const params = stressTests.simulateIncreaseInOperatingExpenses;
      const finalParams = params || await getMissingData('simulateIncreaseInOperatingExpenses', companyId);
      results.push(await simulateIncreaseInOperatingExpenses(finalParams));
    }

    if (stressTests.simulateDecreaseInBondReturn) {
      const params = stressTests.simulateDecreaseInBondReturn;
      const finalParams = params || await getMissingData('simulateDecreaseInBondReturn', companyId);
      results.push(await simulateDecreaseInBondReturn(finalParams));
    }

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Stress Test API Error:', error);
    return NextResponse.json({ error: 'An error occurred while running the tests' }, { status: 500 });
    console.error('Stress Test API Error:', error);
    return NextResponse.json({ error: 'An error occurred while running the tests' }, { status: 500 });
  }
}
