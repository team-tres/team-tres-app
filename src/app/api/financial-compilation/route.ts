/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { calculateFinancialCompilation } from '../../queries/financial-comp/financial-calculations';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const { year, userId, ...financialData } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const calculated = calculateFinancialCompilation(financialData);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: `User with ID ${userId} not found.` }, { status: 404 });
    }

    if (user.companyId === null) {
      return NextResponse.json({ error: `User with ID ${userId} does not have an associated company.` }, { status: 400 });
    }

    const dbData = {
      companyId: user.companyId,
      year,
      userId,
      ...calculated,
    };

    const newRecord = await prisma.financialCompilation.create({ data: dbData });
    // console.log(newRecord);
    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error('Error saving financial compilation:', error);
    return NextResponse.json({ error: 'Failed to save financial compilation' }, { status: 500 });
  }
}
