'use server';

import { Stuff, FinancialCompilation } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

export async function addFinancialCompilation(data: {
  companyId: number;
  year: number;
  revenue: number;
  netSales: number;
  costOfContracting: number;
  overhead: number;
  costOfGoodsSold: number;
  grossProfit: number;
  grossMarginPercentage: number;
  salariesAndBenefits: number;
  rentAndOverhead: number;
  depreciationAndAmortization: number;
  interest: number;
  totalOperatingExpenses: number;
  operatingExpensesPercentage: number;
  profitFromOperations: number;
  profitFromOperationsPercentage: number;
  interestIncome: number;
  interestExpense: number;
  gainOnDisposalOfAssets: number;
  otherIncome: number;
  totalOtherIncome: number;
  totalOtherIncomePercentage: number;
  incomeBeforeIncomeTaxes: number;
  pretaxIncomePercentage: number;
  incomeTaxes: number;
  netIncome: number;
  netIncomePercentage: number;
  cashAndCashEquivalents: number;
  accountsReceivable: number;
  inventory: number;
  totalCurrentAssets: number;
  propertyPlantAndEquipment: number;
  investment: number;
  totalLongTermAsset: number;
  accountsPayable: number;
  longDebtService: number;
  taxesPayable: number;
  totalCurrentLiabilities: number;
  currentDebtService: number;
  loansPayable: number;
  totalLongTermLiabilities: number;
  totalLiabilities: number;
  equityCapital: number;
  retainedEarnings: number;
  totalStockholdersEquity: number;
  totalLiabilitiesAndEquity: number;
}) {
  try {
    await prisma.financialCompilation.create({
      data: {
        ...data,
        // Convert all number fields to integers as per your schema
        revenue: Math.round(data.revenue),
        netSales: Math.round(data.netSales),
        // ... add all other number fields with Math.round()
      },
    });

    redirect('/financials');
  } catch (error) {
    console.error('Error adding financial compilation:', error);
    throw new Error('Failed to add financial compilation');
  }
}

export async function editStuff(stuff: Stuff) {
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  redirect('/list');
}

export async function deleteStuff(id: number) {
  await prisma.stuff.delete({
    where: { id },
  });
  redirect('/list');
}

export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
