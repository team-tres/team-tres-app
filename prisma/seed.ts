import { PrismaClient, Role, Prisma } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const users = [
    { email: 'client@gmail.com',
      username: 'client',
      password: 'password',
      role: Role.CLIENT,
      companyIni: 'Company 1',
      status: true,
      companyId: 1,
    },
    { email: 'admin@gmail.com',
      username: 'admin',
      password: 'password',
      role: Role.ADMIN,
      status: true },
    {
      email: 'analyst@gmail.com',
      username: 'analyst',
      password: 'password',
      role: Role.ANALYST,
      companyIni: 'Company 1',
      status: true,
      companyId: 1,
    },
    {
      email: 'auditor@gmail.com',
      username: 'auditor',
      password: 'password',
      role: Role.AUDITOR,
      companyIni: 'Company 1',
      status: true,
      companyId: 1,
    },
  ];

  const companies = [
    { name: 'Company 1' },
    { name: 'Company 2' },
  ];

  /* eslint-disable no-await-in-loop */
  //* * Seeding logic */
  

  for (const company of companies) {
    await prisma.company.upsert({
      where: { name: company.name },
      update: {},
      create: {
        name: company.name,
      },
    });
  }
for (const user of users) {
    user.password = await hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        password: user.password,
        username: user.username,
        role: user.role,
        status: user.status,
        companyIni: user.companyIni,
        companyId: user.companyId,
      },
      create: {
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
        status: user.status,
        companyIni: user.companyIni,
        companyId: user.companyId,

      },
    });
  }
  // Seed StressTest model with dummy data
//   const company1 = await prisma.company.findUnique({ where: { name: 'Company 1' } });
//   const adminUser = await prisma.user.findUnique({ where: { email: 'admin@gmail.com' } });


//   if (company1 && adminUser) {
//     await prisma.stressTest.create({
//       data: {
//         companyId: company1.id,
//         userId: adminUser.id,
//         investmentAmount: 1000000,
//         interestRate: new Prisma.Decimal(5),
//         interestRateDrop: new Prisma.Decimal(2),
//         impactedYears: 5,
//         reinvestmentPercentage: new Prisma.Decimal(0.02),

//         investmentRate: new Prisma.Decimal(0.03),
//         investmentRateDrop: new Prisma.Decimal(0.01),

//         expensesAndYear: JSON.stringify({ year2023: 50000, year2024: 55000 }),
//         increasePercentage: new Prisma.Decimal(0.05),

//         loanPeriod: 10,
//         baselineInterestRate: new Prisma.Decimal(4),
//         stressTestInterestRate: new Prisma.Decimal(6),
//       },
//     });
//   } else {
//     console.error('Error: Unable to find Company 1 or Admin user to associate StressTest');
//   }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
