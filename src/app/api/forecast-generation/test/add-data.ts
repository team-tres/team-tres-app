/* eslint-disable no-await-in-loop */
import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function addTestData() {
  const testUsers = [
    {
      email: 'kimoriyadex@gmail.com',
      username: 'Kimoriya',
      password: 'p',
      role: Role.CLIENT,
      companyIni: 'Kimoriya',
      status: true,
    },
    {
      email: 'admin@gmail.com',
      username: 'admin',
      password: 'p',
      role: Role.CLIENT,
      companyIni: 'Spire',
      status: true,
    },
    {
      email: 'analyst@gmail.com',
      username: 'analyst',
      password: 'p',
      role: Role.CLIENT,
      companyIni: 'Spire',
      status: true,
    },
    {
      email: 'auditor@gmail.com',
      username: 'auditor',
      password: 'p',
      role: Role.CLIENT,
      companyIni: 'Spire',
      status: true,
    },
    {
      email: 'client@gmail.com',
      username: 'client',
      password: 'p',
      role: Role.CLIENT,
      companyIni: 'Spire',
      status: true,
    },
  ];

  let createdUserId: number | null = null;

  for (const user of testUsers) {
    user.password = await hash(user.password, 10);
    const createdUser = await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
        status: user.status,
        companyIni: user.companyIni,
      },
    });
    createdUserId = createdUser.id;
    console.log(`User created: ${createdUser.username}`);
  }

  if (createdUserId === null) {
    throw new Error('No user created.');
  }

  const testCompanies = [
    { name: 'Kimoriya' },
  ];

  let createdCompanyId: number | null = null;
  for (const company of testCompanies) {
    const createdCompany = await prisma.company.create({
      data: company,
    });
    createdCompanyId = createdCompany.id;
    console.log(`Company created: ${createdCompany.name}`);
  }

  if (createdCompanyId === null) {
    throw new Error('No company created.');
  }

  const financialTestData = [
    {
      companyId: createdCompanyId,
      userId: createdUserId,
      year: 2022,
      revenue: 131345,
      netSales: 131345,
      costOfContracting: 48456,
      overhead: 667,
      costOfGoodsSold: 49123,
      grossProfit: 82222,
      grossMarginPercentage: 0.626000228406106,
      salariesAndBenefits: 23872,
      rentAndOverhead: 10087,
      depreciationAndAmortization: 17205,
      interest: 1500,
      totalOperatingExpenses: 52664,
      operatingExpensesPercentage: 0.4009593056454376,
      profitFromOperations: 29558,
      profitFromOperationsPercentage: 0.22504092276066848,
      interestIncome: 0,
      interestExpense: 0,
      gainOnDisposalOfAssets: 0,
      otherIncome: 0,
      totalOtherIncome: 0,
      totalOtherIncomePercentage: 0,
      incomeBeforeIncomeTaxes: 29558,
      pretaxIncomePercentage: 0.22504092276066848,
      incomeTaxes: 8483,
      netIncome: 21075,
      netIncomePercentage: 0.16045528950473942,
      cashAndCashEquivalents: 183715,
      accountsReceivable: 6567,
      inventory: 9825,
      totalCurrentAssets: 200107,
      propertyPlantAndEquipment: 40145,
      investment: 0,
      totalLongTermAssets: 40145,
      totalAssets: 240252,
      accountsPayable: 4912,
      currentDebtService: 5000,
      taxesPayable: 4265,
      totalCurrentLiabilities: 14177,
      longDebtService: 15000,
      loansPayable: 20000,
      totalLongTermLiabilities: 35000,
      totalLiabilities: 49177,
      equityCapital: 170000,
      retainedEarnings: 21075,
      totalStockholdersEquity: 191075,
      totalLiabilitiesAndEquity: 240252,
    },
    {
      companyId: createdCompanyId,
      userId: createdUserId,
      year: 2023,
      revenue: 142341,
      netSales: 142341,
      costOfContracting: 52587,
      overhead: 667,
      costOfGoodsSold: 53254,
      grossProfit: 89087,
      grossMarginPercentage: 0.6258702692829192,
      salariesAndBenefits: 23002,
      rentAndOverhead: 11020,
      depreciationAndAmortization: 16544,
      interest: 900,
      totalOperatingExpenses: 50466,
      operatingExpensesPercentage: 0.3545429637279491,
      profitFromOperations: 37621,
      profitFromOperationsPercentage: 0.2713273055549701,
      interestIncome: 0,
      interestExpense: 0,
      gainOnDisposalOfAssets: 0,
      otherIncome: 0,
      totalOtherIncome: 0,
      totalOtherIncomePercentage: 0,
      incomeBeforeIncomeTaxes: 38621,
      pretaxIncomePercentage: 0.2713273055549701,
      incomeTaxes: 10908,
      netIncome: 27713,
      netIncomePercentage: 0.1946944309791276,
      cashAndCashEquivalents: 191069,
      accountsReceivable: 7117,
      inventory: 10531,
      totalCurrentAssets: 208717,
      propertyPlantAndEquipment: 38602,
      investment: 20000,
      totalLongTermAssets: 58602,
      totalAssets: 267319,
      accountsPayable: 5265,
      currentDebtService: 5000,
      taxesPayable: 5341,
      totalCurrentLiabilities: 15606,
      longDebtService: 15000,
      loansPayable: 40000,
      totalLongTermLiabilities: 55000,
      totalLiabilities: 70606,
      equityCapital: 170000,
      retainedEarnings: 26713,
      totalStockholdersEquity: 196713,
      totalLiabilitiesAndEquity: 267319,
    },
    {
      companyId: createdCompanyId,
      userId: createdUserId,
      year: 2024,
      revenue: 150772,
      netSales: 150772,
      costOfContracting: 56643,
      overhead: 667,
      costOfGoodsSold: 18881,
      grossProfit: 131891,
      grossMarginPercentage: 0.8747711776722469,
      salariesAndBenefits: 25245,
      rentAndOverhead: 11412,
      depreciationAndAmortization: 16080,
      interest: 900,
      totalOperatingExpenses: 93967,
      operatingExpensesPercentage: 0.6232390629559865,
      profitFromOperations: 39825,
      profitFromOperationsPercentage: 0.2515321147162603,
      interestIncome: 0,
      interestExpense: 0,
      gainOnDisposalOfAssets: 0,
      otherIncome: 0,
      totalOtherIncome: 16980,
      totalOtherIncomePercentage: 0.11262038044199188,
      incomeBeforeIncomeTaxes: 54904,
      pretaxIncomePercentage: 0.3641524951582522,
      incomeTaxes: 11598,
      netIncome: 43306,
      netIncomePercentage: 0.2872283978457539,
      cashAndCashEquivalents: 189550,
      accountsReceivable: 7539,
      inventory: 11342,
      totalCurrentAssets: 208431,
      propertyPlantAndEquipment: 37521,
      investment: 50000,
      totalLongTermAssets: 87521,
      totalAssets: 295952,
      accountsPayable: 5671,
      currentDebtService: 5000,
      taxesPayable: 2054,
      totalCurrentLiabilities: 12725,
      longDebtService: 15000,
      loansPayable: 70000,
      totalLongTermLiabilities: 85000,
      totalLiabilities: 97725,
      equityCapital: 170000,
      retainedEarnings: 28227,
      totalStockholdersEquity: 198227,
      totalLiabilitiesAndEquity: 295952,

    },
  ];

  for (const data of financialTestData) {
    await prisma.financialCompilation.create({
      data,
    });
  }

  console.log('Data added successfully!');
}

addTestData()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
