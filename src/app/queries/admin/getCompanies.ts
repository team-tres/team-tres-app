// app/queries/admin/getCompanies.ts
import { prisma } from '@/lib/prisma';

export default async function getCompanies() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return companies;
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
}
