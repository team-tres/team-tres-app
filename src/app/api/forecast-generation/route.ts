/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateForecast } from '@/app/queries/forecasts/forecast';
import { FinancialCompilation } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { settings, multipliers } = body;

    if (
      !settings
      || typeof settings !== 'object'
      || !multipliers
      || typeof multipliers !== 'object'
    ) {
      return NextResponse.json({ error: 'Invalid settings or multipliers format' }, { status: 400 });
    }

    // Fetch the last 3 years of financial data in ASCENDING order (earliest first)
    const pastData: FinancialCompilation[] = await prisma.financialCompilation.findMany({
      orderBy: { year: 'asc' },
      take: 3,
    });

    if (pastData.length < 3) {
      return NextResponse.json({ error: 'Not enough historical data (need at least 3 years)' }, { status: 400 });
    }

    // Generate forecast
    const forecast = generateForecast(pastData, settings, multipliers);

    return NextResponse.json({ forecast }, { status: 200 });
  } catch (error) {
    console.error('Forecast API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
