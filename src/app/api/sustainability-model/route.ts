/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { prisma } from '@/lib/prisma';
import { StressTestRequest } from '../stress-test/route';
import extractStressTestFields from '../stress-test/__utils__/stress-test-util';

async function getForecastData(companyId: string, settings: any, multipliers: any) {
  try {
    const response = await fetch('http://localhost:3000/api/forecast-generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyId, settings, multipliers }),
    });

    if (!response.ok) {
      console.error('Failed to fetch forecast data:', response.status, response.statusText);
      throw new Error('Failed to fetch forecast data');
    }

    const responseBody = await response.text();

    const data = JSON.parse(responseBody);

    if (!data.forecast) {
      console.error('Forecast data is missing:', data);
      throw new Error('Forecast data is missing');
    }

    return data.forecast;
  } catch (error) {
    console.error('Error in getForecastData:', error);
    throw error;
  }
}

async function callStressTestAPI(payload: StressTestRequest) {
  const response = await fetch('http://localhost:3000/api/stress-test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ error: `User with ID ${userId} not found` }, { status: 404 });
    }
    if (!user.companyId) {
      return NextResponse.json({ error: `User with ID ${userId} doesn't have a company id` }, { status: 404 });
    }
    const companyIdInit = user.companyId;
    // console.log('hello comp id', companyIdInit)
    const companyWithSettings = await prisma.company.findUnique({
      where: { id: companyIdInit },
      include: {
        setting: true,
        multiplier: true,
        StressTest: {
          include: {
            investmentDrop: true,
            revenueDrop: true,
            oneTimeEvent: true,
            operatingIncrease: true,
            bondReturnDrop: true,
          },
        },
      },
    });
    if (!companyWithSettings?.setting) {
      return NextResponse.json(
        { error: `company with id ${companyIdInit} doesn't have setting setup in the database` },
        { status: 404 },
      );
    }
    if (!companyWithSettings?.multiplier) {
      return NextResponse.json(
        { error: `company with id ${companyIdInit} doesn't have multiplier setup in the database` },
        { status: 404 },
      );
    }
    if (!companyWithSettings?.StressTest) {
      return NextResponse.json(
        { error: `company with id ${companyIdInit} doesn't have any stresstest setup in the database` },
        { status: 404 },
      );
    }
    const settings = { ...companyWithSettings.setting };
    const multipliers = { ...companyWithSettings.multiplier };
    const stressTestsArr = { ...companyWithSettings.StressTest };
    const stressTestInit = stressTestsArr[0];
    const stressTests: Record<string, any> = {};

    if (stressTestInit.investmentDrop) {
      stressTests.simulateDropInInvestmentReturnRate = {
        investmentAmount: stressTestInit.investmentDrop.investmentAmount,
        interestRate: stressTestInit.investmentDrop.interestRate.toNumber(),
        interestRateDrop: stressTestInit.investmentDrop.interestRateDrop.toNumber(),
        impactedYears: stressTestInit.investmentDrop.impactedYears,
        reinvestmentPercentage: stressTestInit.investmentDrop.reinvestmentPercentage.toNumber(),
      };
    }

    if (stressTestInit.revenueDrop) {
      stressTests.simulateDropInRevenueReturnRate = {
        netSales: stressTestInit.revenueDrop.netSales,
        investmentRate: stressTestInit.revenueDrop.investmentRate.toNumber(),
        investmentRateDrop: stressTestInit.revenueDrop.investmentRateDrop.toNumber(),
      };
    }

    if (stressTestInit.oneTimeEvent) {
      stressTests.simulateOneTimeEventExpense = {
        expense: stressTestInit.oneTimeEvent.expense,
        eventYear: stressTestInit.oneTimeEvent.eventYear,
      };
    }

    if (stressTestInit.operatingIncrease) {
      stressTests.simulateIncreaseInOperatingExpenses = {
        expensesByYear: stressTestInit.operatingIncrease.expensesByYear,
        increasePercentage: stressTestInit.operatingIncrease.increasePercentage.toNumber(),
      };
    }

    if (stressTestInit.bondReturnDrop) {
      stressTests.simulateDecreaseInBondReturn = {
        loanAmount: stressTestInit.bondReturnDrop.loanAmount,
        loanPeriod: stressTestInit.bondReturnDrop.loanPeriod,
        baselineInterestRate: stressTestInit.bondReturnDrop.baselineInterestRate.toNumber(),
        stressTestInterestRate: stressTestInit.bondReturnDrop.stressTestInterestRate.toNumber(),
      };
    }

    const companyId = companyIdInit.toString();
    // console.log(stressTests);
    if (
      !settings || typeof settings !== 'object'
      || !multipliers || typeof multipliers !== 'object'
      || !companyId || typeof companyId !== 'string'
      || !stressTests || typeof stressTests !== 'object'
    ) {
      return NextResponse.json({ error: 'Invalid inputs' }, { status: 400 });
    }

    const companyIdNumber = Number(companyId);
    if (Number.isNaN(companyIdNumber)) {
      return NextResponse.json({ error: 'Invalid companyId' }, { status: 400 });
    }

    const pastData = await prisma.financialCompilation.findMany({
      where: { companyId: companyIdNumber },
      orderBy: { year: 'asc' },
      take: 3,
    });

    if (pastData.length < 3) {
      return NextResponse.json({ error: 'Not enough historical data (need at least 3 years)' }, { status: 400 });
    }

    const forecastData = await getForecastData(companyId, settings, multipliers);

    const { netSales, expensesByYear } = extractStressTestFields(forecastData);
    const updatedStressTests = { ...stressTests };
    if (updatedStressTests.simulateDropInRevenueReturnRate) {
      updatedStressTests.simulateDropInRevenueReturnRate = {
        ...updatedStressTests.simulateDropInRevenueReturnRate,
        netSales,
      };
    }

    if (updatedStressTests.simulateIncreaseInOperatingExpenses) {
      updatedStressTests.simulateIncreaseInOperatingExpenses = {
        ...updatedStressTests.simulateIncreaseInOperatingExpenses,
        expensesByYear,
      };
    }

    const payload = {
      companyId: companyIdNumber.toString(),
      settings,
      multipliers,
      stressTests: updatedStressTests,
    };

    const stressTestResults = await allStresscTestAPI(payload);

    return NextResponse.json({
      success: true,
      forecast: forecastData,
      stressTestResults,
    });
  } catch (error) {
    console.error('Sustainability Model API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
