import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
  const financialData = await prisma.financialCompilation.findMany();
  console.log(financialData);
  prisma.$disconnect();
}

checkData();
