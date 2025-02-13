/*
  Warnings:

  - You are about to drop the `BalanceSheet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IncomeStatement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BalanceSheet";

-- DropTable
DROP TABLE "IncomeStatement";

-- CreateTable
CREATE TABLE "FinancialCompilation" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "revenue" INTEGER NOT NULL,
    "netSales" INTEGER NOT NULL,
    "costOfContracting" INTEGER NOT NULL,
    "overhead" INTEGER NOT NULL,
    "costOfGoodsSold" INTEGER NOT NULL,
    "grossProfit" INTEGER NOT NULL,
    "grossMarginPercentage" DOUBLE PRECISION NOT NULL,
    "salariesAndBenefits" INTEGER NOT NULL,
    "rentAndOverhead" INTEGER NOT NULL,
    "depreciationAndAmortization" INTEGER NOT NULL,
    "interest" INTEGER NOT NULL,
    "totalOperatingExpenses" INTEGER NOT NULL,
    "operatingExpensesPercentage" DOUBLE PRECISION NOT NULL,
    "profitFromOperations" INTEGER NOT NULL,
    "profitFromOperationsPercentage" DOUBLE PRECISION NOT NULL,
    "interestIncome" INTEGER NOT NULL,
    "interestExpense" INTEGER NOT NULL,
    "gainOnDisposalOfAssets" INTEGER NOT NULL,
    "otherIncome" INTEGER NOT NULL,
    "totalOtherIncome" INTEGER NOT NULL,
    "totalOtherIncomePercentage" DOUBLE PRECISION NOT NULL,
    "incomeBeforeIncomeTaxes" INTEGER NOT NULL,
    "pretaxIncomePercentage" DOUBLE PRECISION NOT NULL,
    "incomeTaxes" INTEGER NOT NULL,
    "netIncome" INTEGER NOT NULL,
    "netIncomePercentage" DOUBLE PRECISION NOT NULL,
    "cashAndCashEquivalents" INTEGER NOT NULL,
    "accountsReceivable" INTEGER NOT NULL,
    "inventory" INTEGER NOT NULL,
    "totalCurrentAssets" INTEGER NOT NULL,
    "propertyPlantAndEquipment" INTEGER NOT NULL,
    "investment" INTEGER NOT NULL,
    "totalLongTermAsset" INTEGER NOT NULL,
    "accountsPayable" INTEGER NOT NULL,
    "longDebtService" INTEGER NOT NULL,
    "taxesPayable" INTEGER NOT NULL,
    "totalCurrentLiabilities" INTEGER NOT NULL,
    "currentDebtService" INTEGER NOT NULL,
    "loansPayable" INTEGER NOT NULL,
    "totalLongTermLiabilities" INTEGER NOT NULL,
    "totalLiabilities" INTEGER NOT NULL,
    "equityCapital" INTEGER NOT NULL,
    "retainedEarnings" INTEGER NOT NULL,
    "totalStockholdersEquity" INTEGER NOT NULL,
    "totalLiabilitiesAndEquity" INTEGER NOT NULL,

    CONSTRAINT "FinancialCompilation_pkey" PRIMARY KEY ("id")
);
