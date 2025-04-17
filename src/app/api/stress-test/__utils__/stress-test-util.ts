import { prisma } from '@prisma/client';

export default function extractStressTestFields(forecastData: prisma.FinancialCompilation[]) {
  const netSales: number[] = [];
  const expensesByYear: number[] = [];

  for (const data of forecastData) {
    netSales.push(data.netSales);
    expensesByYear.push(data.totalOperatingExpenses);
  }
  return { netSales, expensesByYear };
}
