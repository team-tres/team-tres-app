/* eslint-disable no-await-in-loop */
import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function addTestData() {
  // Example Test User
  const testUsers = [
    {
      email: 'kimoriyadex@gmail.com',
      username: 'Kimoriya',
      password: 'password',
      role: Role.CLIENT,
      companyIni: 'Kimoriya',
      status: true,
    },
  ];

  let createdUserId: number | null = null;

  // Add test users
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
    createdUserId = createdUser.id; // Store the userId of the created user
    console.log(`User created: ${createdUser.username}`);
  }

  if (createdUserId === null) {
    throw new Error('No user created.');
  }

  // Example Test Companies
  const testCompanies = [
    { name: 'Kimoriya' },
  ];

  // Add test companies and get the created company id
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

  // Example Test Financial Data
  const financialTestData = [
    {
      companyId: createdCompanyId, // Use the created companyId
      userId: createdUserId, // Use the created userId
      year: 2022,
      revenue: 131345,
      netSales: 131345,
      costOfContracting: 48456,
      overhead: 667,
      salariesAndBenefits: 23872,
      rentAndOverhead: 10087,
      depreciationAndAmortization: 17205,
      interest: 1500,
      profitFromOperations: 29558,
      interestIncome: 0,
      interestExpense: 0,
      gainOnDisposalOfAssets: 0,
      otherIncome: 0,
      incomeTaxes: 8483,
      cashAndCashEquivalents: 183715,
      accountsReceivable: 6567,
      inventory: 9825,
      propertyPlantAndEquipment: 40145,
      investment: 0,
      accountsPayable: 4912,
      currentDebtService: 5000,
      taxesPayable: 4265,
      longDebtService: 15000,
      loansPayable: 20000,
      equityCapital: 170000,
      retainedEarnings: 21075,
      costOfGoodsSold: 49123,
      grossProfit: 82222,
      grossMarginPercentage: 0.626000228406106,
      totalOperatingExpenses: 52664,
      operatingExpensesPercentage: 0.4009593056454376,
      profitFromOperationsPercentage: 0.22504092276066848,
      totalOtherIncome: 0,
      totalOtherIncomePercentage: 0,
      incomeBeforeIncomeTaxes: 29558,
      pretaxIncomePercentage: 0.22504092276066848,
      netIncome: 21075,
      netIncomePercentage: 0.16045528950473942,
      totalCurrentAssets: 200107,
      totalLongTermAssets: 40145,
      totalAssets: 240252,
      totalCurrentLiabilities: 14177,
      totalLongTermLiabilities: 35000,
      totalLiabilities: 49177,
      totalStockholdersEquity: 191075,
      totalLiabilitiesAndEquity: 240252,
    },
    {
      companyId: createdCompanyId, // Use the created companyId
      userId: createdUserId, // Use the created userId
      year: 2023,
      revenue: 142341,
      costOfContracting: 52587,
      overhead: 667,
      salariesAndBenefits: 23002,
      rentAndOverhead: 11020,
      depreciationAndAmortization: 16544,
      interest: 900,
      profitFromOperations: 37621,
      interestIncome: 0,
      interestExpense: 0,
      gainOnDisposalOfAssets: 0,
      otherIncome: 0,
      incomeTaxes: 10908,
      cashAndCashEquivalents: 191069,
      accountsReceivable: 7117,
      inventory: 10531,
      propertyPlantAndEquipment: 38602,
      investment: 20000,
      accountsPayable: 5265,
      currentDebtService: 5000,
      taxesPayable: 5341,
      longDebtService: 15000,
      loansPayable: 40000,
      equityCapital: 170000,
      retainedEarnings: 26713,
      netSales: 142341,
      costOfGoodsSold: 53254,
      grossProfit: 89087,
      grossMarginPercentage: 0.6258702692829192,
      totalOperatingExpenses: 50466,
      operatingExpensesPercentage: 0.3545429637279491,
      profitFromOperationsPercentage: 0.2713273055549701,
      totalOtherIncome: 0,
      totalOtherIncomePercentage: 0,
      incomeBeforeIncomeTaxes: 38621,
      pretaxIncomePercentage: 0.2713273055549701,
      netIncome: 27713,
      netIncomePercentage: 0.1946944309791276,
      totalCurrentAssets: 208717,
      totalLongTermAssets: 58602,
      totalAssets: 267319,
      totalCurrentLiabilities: 15606,
      totalLongTermLiabilities: 55000,
      totalLiabilities: 70606,
      totalStockholdersEquity: 196713,
      totalLiabilitiesAndEquity: 267319,
    },
    {
      companyId: createdCompanyId, // Use the created companyId
      userId: createdUserId, // Use the created userId
      year: 2024,
      revenue: 150772,
      costOfContracting: 56643,
      overhead: 667,
      salariesAndBenefits: 25245,
      rentAndOverhead: 11412,
      depreciationAndAmortization: 16080,
      interest: 900,
      profitFromOperations: 39825,
      interestIncome: 0,
      interestExpense: 0,
      gainOnDisposalOfAssets: 0,
      otherIncome: 0,
      incomeTaxes: 11598,
      cashAndCashEquivalents: 189550,
      accountsReceivable: 7539,
      inventory: 11342,
      propertyPlantAndEquipment: 37521,
      investment: 50000,
      accountsPayable: 5671,
      currentDebtService: 5000,
      taxesPayable: 2054,
      longDebtService: 15000,
      loansPayable: 70000,
      equityCapital: 170000,
      retainedEarnings: 28227,
      netSales: 150772,
      costOfGoodsSold: 18881,
      grossProfit: 131891,
      grossMarginPercentage: 0.8747711776722469,
      totalOperatingExpenses: 93967,
      operatingExpensesPercentage: 0.6232390629559865,
      profitFromOperationsPercentage: 0.2515321147162603,
      totalOtherIncome: 16980,
      totalOtherIncomePercentage: 0.11262038044199188,
      incomeBeforeIncomeTaxes: 54904,
      pretaxIncomePercentage: 0.3641524951582522,
      netIncome: 43306,
      netIncomePercentage: 0.2872283978457539,
      totalCurrentAssets: 208431,
      totalLongTermAssets: 87521,
      totalAssets: 295952,
      totalCurrentLiabilities: 12725,
      totalLongTermLiabilities: 85000,
      totalLiabilities: 97725,
      totalStockholdersEquity: 198227,
      totalLiabilitiesAndEquity: 295952,
    },
  ];

  // Add test financial data
  for (const data of financialTestData) {
    await prisma.financialCompilation.create({
      data,
    });
  }

  console.log('Test data added successfully!');
}

addTestData()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
