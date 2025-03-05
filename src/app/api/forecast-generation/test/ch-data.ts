import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
  const financialData = await prisma.financialCompilation.findMany();
  console.log(financialData);

  const userData = await prisma.user.findMany();
  console.log(userData);

  const companyData = await prisma.company.findMany();
  console.log(companyData);

  prisma.$disconnect();
}

checkData();
