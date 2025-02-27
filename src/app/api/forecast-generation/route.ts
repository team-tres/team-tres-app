/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateForecast } from '@/app/queries/forecasts/forecast';
import { FinancialCompilation } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { settings, multipliers, companyId } = body;

    // Validate settings, multipliers, and companyId
    if (
      !settings || typeof settings !== 'object'
      || !multipliers || typeof multipliers !== 'object'
      || !companyId || typeof companyId !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid settings, multipliers, or companyId format' }, { status: 400 });
    }

    // Convert companyId to a number
    const companyIdNumber = Number(companyId);
    if (Number.isNaN(companyIdNumber)) {
      return NextResponse.json({ error: 'Invalid companyId' }, { status: 400 });
    }

    // Fetch the last 3 years of financial data for the specific company
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

    // Generate forecast
    const forecast = generateForecast(pastData, settings, multipliers);

    return NextResponse.json({ forecast }, { status: 200 });
  } catch (error) {
    console.error('Forecast API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
