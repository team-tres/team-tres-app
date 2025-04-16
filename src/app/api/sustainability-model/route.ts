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
    const { settings, multipliers, companyId, stressTests } = body;

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

    const stressTestResults = await callStressTestAPI(payload);

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
