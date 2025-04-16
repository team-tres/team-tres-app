import { PrismaClient, Role, Prisma } from '@prisma/client';
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

  const company = { name: 'Company 1' };

  const financialCompilation = [
    {
      year: 2025,
      userId: 3,
      revenue: 153034,
      netSales: 153034,
      costOfContracting: 52562,
      overhead: 667,
      costOfGoodsSold: 53229,
      grossProfit: 99805,
      grossMarginPercentage: 0.652,
      salariesAndBenefits: 24040,
      rentAndOverhead: 10840,
      depreciationAndAmortization: 16610,
      interest: 1100,
      totalOperatingExpenses: 52589,
      operatingExpensesPercentage: 0.344,
      profitFromOperations: 35668,
      profitFromOperationsPercentage: 0.233,
      interestIncome: 0,
      interestExpense: 0,
      gainOnDisposalOfAssets: 0,
      otherIncome: 0,
      totalOtherIncome: 0,
      totalOtherIncomePercentage: 0,
      incomeBeforeIncomeTaxes: 35668,
      pretaxIncomePercentage: 0.233,
      incomeTaxes: 10330,
      netIncome: 25338,
      netIncomePercentage: 0.166,

      // BalanceSheet
      totalAssets: 267841,
      cashAndCashEquivalents: 188111,
      accountsReceivable: 7074,
      inventory: 10566,
      totalCurrentAssets: 205752,
      propertyPlantAndEquipment: 38756,
      investment: 23333,
      totalLongTermAssets: 62089,
      accountsPayable: 5283,
      longDebtService: 15000,
      taxesPayable: 3887,
      totalCurrentLiabilities: 14169,
      currentDebtService: 5000,
      loansPayable: 43333,
      totalLongTermLiabilities: 58333,
      totalLiabilities: 72503,
      equityCapital: 170000,
      retainedEarnings: 25338,
      totalStockholdersEquity: 195338,
      totalLiabilitiesAndEquity: 267841,
    },
    {
      year: 2026,
      userId: 3,
      revenue: 155329,
      netSales: 155329,
      costOfContracting: 53931,
      overhead: 667,
      costOfGoodsSold: 54598,
      grossProfit: 100731,
      grossMarginPercentage: 0.649,
      salariesAndBenefits: 24096,
      rentAndOverhead: 11091,
      depreciationAndAmortization: 16411,
      interest: 967,
      totalOperatingExpenses: 52564,
      operatingExpensesPercentage: 0.338,
      profitFromOperations: 37705,
      profitFromOperationsPercentage: 0.243,
      interestIncome: 0,
      interestExpense: 0,
      gainOnDisposalOfAssets: 0,
      otherIncome: 0,
      totalOtherIncome: 0,
      totalOtherIncomePercentage: 0,
      incomeBeforeIncomeTaxes: 37705,
      pretaxIncomePercentage: 0.243,
      incomeTaxes: 10945,
      netIncome: 26759,
      netIncomePercentage: 0.172,

      // BalanceSheet
      totalAssets: 277037,
      cashAndCashEquivalents: 189577,
      accountsReceivable: 7243,
      inventory: 10813,
      totalCurrentAssets: 207633,
      propertyPlantAndEquipment: 38293,
      investment: 31111,
      totalLongTermAssets: 69404,
      accountsPayable: 5406,
      longDebtService: 15000,
      taxesPayable: 3761,
      totalCurrentLiabilities: 14167,
      currentDebtService: 5000,
      loansPayable: 51111,
      totalLongTermLiabilities: 66111,
      totalLiabilities: 80278,
      equityCapital: 170000,
      retainedEarnings: 26759,
      totalStockholdersEquity: 196759,
      totalLiabilitiesAndEquity: 277037,
    },
    {
      year: 2027,
      userId: 3,
      revenue: 157659,
      netSales: 157659,
      costOfContracting: 54379,
      overhead: 667,
      costOfGoodsSold: 55046,
      grossProfit: 102613,
      grossMarginPercentage: 0.651,
      salariesAndBenefits: 24460,
      rentAndOverhead: 11114,
      depreciationAndAmortization: 16367,
      interest: 989,
      totalOperatingExpenses: 52930,
      operatingExpensesPercentage: 0.336,
      profitFromOperations: 37733,
      profitFromOperationsPercentage: 0.239,
      interestIncome: 0,
      interestExpense: 0,
      gainOnDisposalOfAssets: 0,
      otherIncome: 0,
      totalOtherIncome: 0,
      totalOtherIncomePercentage: 0,
      incomeBeforeIncomeTaxes: 37733,
      pretaxIncomePercentage: 0.239,
      incomeTaxes: 10958,
      netIncome: 26775,
      netIncomePercentage: 0.17,

      // BalanceSheet
      totalAssets: 280277,
      cashAndCashEquivalents: 189079,
      accountsReceivable: 7286,
      inventory: 10907,
      totalCurrentAssets: 207272,
      propertyPlantAndEquipment: 38190,
      investment: 34815,
      totalLongTermAssets: 73005,
      accountsPayable: 5453,
      longDebtService: 15000,
      taxesPayable: 3234,
      totalCurrentLiabilities: 13687,
      currentDebtService: 5000,
      loansPayable: 54815,
      totalLongTermLiabilities: 69815,
      totalLiabilities: 83502,
      equityCapital: 170000,
      retainedEarnings: 26775,
      totalStockholdersEquity: 196775,
      totalLiabilitiesAndEquity: 280277,
    },
  ];

  const companySettings = {
    revenue: 'multiplier',
    costOfContracting: 'average',
    overhead: 'average',
    salariesAndBenefits: 'average',
    rentAndOverhead: 'average',
    depreciationAndAmortization: 'average',
    interest: 'average',
    profitFromOperations: 'average',
    interestIncome: 'average',
    interestExpense: 'average',
    gainOnDisposalOfAssets: 'average',
    otherIncome: 'average',
    incomeTaxes: 'average',
    cashAndCashEquivalents: 'average',
    accountsReceivable: 'average',
    inventory: 'average',
    propertyPlantAndEquipment: 'average',
    investment: 'average',
    accountsPayable: 'average',
    taxesPayable: 'average',
    currentDebtService: 'average',
    loansPayable: 'average',
    longDebtService: 'average',
    equityCapital: 'average',
    retainedEarnings: 'average',
  };

  const companyMultipliers = {
    revenue: 0.015,
    costOfContracting: 0,
    overhead: 0,
    salariesAndBenefits: 0,
    rentAndOverhead: 0,
    depreciationAndAmortization: 0,
    interest: 0,
    profitFromOperations: 0,
    interestIncome: 0,
    interestExpense: 0,
    gainOnDisposalOfAssets: 0,
    otherIncome: 0,
    incomeTaxes: 0,
    cashAndCashEquivalents: 0,
    accountsReceivable: 0,
    inventory: 0,
    propertyPlantAndEquipment: 0,
    investment: 0,
    accountsPayable: 0,
    taxesPayable: 0,
    currentDebtService: 0,
    loansPayable: 0,
    longDebtService: 0,
    equityCapital: 0,
    retainedEarnings: 0,
  };

  const StressTest = {
    companyId: 1,
    userId: 3,
    investmentDrop: {
      investmentAmount: 1000000,
      interestRate: 5,
      interestRateDrop: 2,
      impactedYears: 5,
      reinvestmentPercentage: 0.02,
    },
    revenueDrop: {
      netSales: [100000, 200000, 150000],
      investmentRate: 0.03,
      investmentRateDrop: 0.01,
    },
    oneTimeEvent: {
      expense: 500000,
      eventYear: 2025,
    },
    operatingIncrease: {
      expensesByYear: [1200000, 1300000, 1400000],
      increasePercentage: 0.05,
    },
    bondReturnDrop: {
      loanAmount: 500000,
      loanPeriod: 10,
      baselineInterestRate: 6,
      stressTestInterestRate: 2.3,
    },

  };
  /* eslint-disable no-await-in-loop */
  //* * Seeding logic */

  await prisma.company.upsert({
    where: { name: company.name },
    update: {
    },
    create: {
      name: company.name,
    },
  });
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
      },
    });
  }

  for (const company of companies) {
    await prisma.company.upsert({
      where: { name: company.name },
      update: {},
      create: {
        name: company.name,
      },
    });
  }

  // Seed StressTest model with dummy data
  const company1 = await prisma.company.findUnique({ where: { name: 'Company 1' } });
  const adminUser = await prisma.user.findUnique({ where: { email: 'admin@gmail.com' } });

  if (company1 && adminUser) {
    await prisma.stressTest.create({
      data: {
        companyId: company1.id,
        userId: adminUser.id,
        investmentAmount: 1000000,
        interestRate: new Prisma.Decimal(5),
        interestRateDrop: new Prisma.Decimal(2),
        impactedYears: 5,
        reinvestmentPercentage: new Prisma.Decimal(0.02),

        investmentRate: new Prisma.Decimal(0.03),
        investmentRateDrop: new Prisma.Decimal(0.01),

        expensesAndYear: JSON.stringify({ year2023: 50000, year2024: 55000 }),
        increasePercentage: new Prisma.Decimal(0.05),

        loanPeriod: 10,
        baselineInterestRate: new Prisma.Decimal(4),
        stressTestInterestRate: new Prisma.Decimal(6),
      },
    });
  } else {
    console.error('Error: Unable to find Company 1 or Admin user to associate StressTest');
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
