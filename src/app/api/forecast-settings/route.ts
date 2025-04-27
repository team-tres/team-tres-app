/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const multiplierFields = [
  'revenue',
  'costOfContracting',
  'overhead',
  'salariesAndBenefits',
  'rentAndOverhead',
  'depreciationAndAmortization',
  'interest',
  'profitFromOperations',
  'interestIncome',
  'interestExpense',
  'gainOnDisposalOfAssets',
  'otherIncome',
  'incomeTaxes',
  'cashAndCashEquivalents',
  'accountsReceivable',
  'inventory',
  'propertyPlantAndEquipment',
  'investment',
  'accountsPayable',
  'taxesPayable',
  'currentDebtService',
  'loansPayable',
  'longDebtService',
  'equityCapital',
  'retainedEarnings',
] as const;

function getValue(setting: string, multiplier: number) {
  return setting === 'multiplier' ? multiplier : 1;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyId, settings, multipliers } = body;

    if (!companyId || !settings || !multipliers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const companyIdInt = parseInt(companyId, 10);

    const multiplierData: any = {
      companyId: companyIdInt,
    };

    for (const field of multiplierFields) {
      multiplierData[field] = getValue(settings[field], multipliers[field]);
    }

    const settingData: any = {
      companyId: companyIdInt,
    };

    for (const field of multiplierFields) {
      settingData[field] = settings[field]; // 'multiplier' or 'average'
    }

    const [companyMultiplier, companySetting] = await prisma.$transaction([
      prisma.companyMultiplier.upsert({
        where: { companyId: companyIdInt },
        update: multiplierData,
        create: multiplierData,
      }),
      prisma.companySetting.upsert({
        where: { companyId: companyIdInt },
        update: settingData,
        create: settingData,
      }),
    ]);

    return NextResponse.json({ companyMultiplier, companySetting }, { status: 201 });
  } catch (error) {
    console.error('[forecast-settings POST] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId');

    if (!companyId) {
      return NextResponse.json({ error: 'companyId is required as query param' }, { status: 400 });
    }

    const companyMultiplier = await prisma.companyMultiplier.findUnique({
      where: { companyId: parseInt(companyId, 10) },
    });

    const companySetting = await prisma.companySetting.findUnique({
      where: { companyId: parseInt(companyId, 10) },
    });

    if (!companyMultiplier || !companySetting) {
      return NextResponse.json({ error: 'Company settings not found' }, { status: 404 });
    }

    return NextResponse.json({ companyMultiplier, companySetting }, { status: 200 });
  } catch (error) {
    console.error('[forecast-settings GET] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
