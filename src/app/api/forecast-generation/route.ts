/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateForecast } from '@/app/queries/forecasts/forecast';
import { FinancialCompilation } from '@prisma/client';
import { processForecast } from '@/app/queries/financial-comp/financial-calculations';

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
      return NextResponse.json({ error: 'Invalid companyId' }, { status: 400 });
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
      return NextResponse.json({ error: 'Not enough historical data (need at least 3 years)' }, { status: 400 });
    }

    const forecast = generateForecast(pastData, settings, multipliers);

    const processedForecast = processForecast(forecast);

    return NextResponse.json({ forecast: processedForecast }, { status: 200 });
  } catch (error) {
    console.error('Forecast API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
