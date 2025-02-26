import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearData() {
  try {
    // Clear all financial data
    await prisma.financialCompilation.deleteMany();
    console.log('Financial data cleared successfully!');

    // Clear all companies
    await prisma.company.deleteMany();
    console.log('Company data cleared successfully!');

    // Clear all users
    await prisma.user.deleteMany();
    console.log('User data cleared successfully!');
  } catch (error) {
    console.error('Error clearing data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearData();
