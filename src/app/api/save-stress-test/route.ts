/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, ...stressTestSetting } = body;
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ error: `User with ID ${userId} not found` }, { status: 404 });
    }
    if (user.role !== 'ANALYST') {
      return NextResponse.json({ error: `User with ID ${userId} is not an Analyst` }, { status: 404 });
    }
    if (!user.companyId) {
      return NextResponse.json({ error: `User with ID ${userId} doesn't have a company id` }, { status: 404 });
    }
    const { companyId } = user;
    const dbData = {
      ...stressTestSetting,
      companyId,
      userId,
    };
    const newRecord = await prisma.stressTest.create({ data: dbData });
    return NextResponse.json(newRecord, { status: 201 });
  } catch (err) {
    console.log('error when creating stress test', err);
    return NextResponse.json({ error: 'Failed to save financial compilation' }, { status: 500 });
  }
}
/* example of post method:
POST: localhost:3000/api/save-stress-test/
{
  "userId": 3,
  "investmentAmount": 500000,
  "interestRate": 0.05,
  "interestRateDrop": 0.01,
  "impactedYears": 5,
  "reinvestmentPercentage": 0.1,
  "investmentRate": 0.07,
  "investmentRateDrop": 0.02,
  "expensesAndYear": {
    "2024": 120000,
    "2025": 125000,
    "2026": 130000
  },
  "increasePercentage": 0.03,
  "loanPeriod": 10,
  "baselineInterestRate": 0.045,
  "stressTestInterestRate": 0.065
}
*/
