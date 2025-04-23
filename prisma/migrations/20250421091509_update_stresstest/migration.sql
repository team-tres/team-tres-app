/*
  Warnings:

  - You are about to drop the column `baselineInterestRate` on the `StressTest` table. All the data in the column will be lost.
  - You are about to drop the column `expensesAndYear` on the `StressTest` table. All the data in the column will be lost.
  - You are about to drop the column `impactedYears` on the `StressTest` table. All the data in the column will be lost.
  - You are about to drop the column `increasePercentage` on the `StressTest` table. All the data in the column will be lost.
  - You are about to drop the column `interestRate` on the `StressTest` table. All the data in the column will be lost.
  - You are about to drop the column `interestRateDrop` on the `StressTest` table. All the data in the column will be lost.
  - You are about to drop the column `investmentAmount` on the `StressTest` table. All the data in the column will be lost.
  - You are about to drop the column `investmentRate` on the `StressTest` table. All the data in the column will be lost.
  - You are about to drop the column `investmentRateDrop` on the `StressTest` table. All the data in the column will be lost.
  - You are about to drop the column `loanPeriod` on the `StressTest` table. All the data in the column will be lost.
  - You are about to drop the column `reinvestmentPercentage` on the `StressTest` table. All the data in the column will be lost.
  - You are about to drop the column `stressTestInterestRate` on the `StressTest` table. All the data in the column will be lost.
  - Added the required column `type` to the `StressTest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StressTestType" AS ENUM ('DROP_INVESTMENT_RETURN', 'DROP_REVENUE_RETURN', 'ONE_TIME_EVENT_EXPENSE', 'INCREASE_OPERATING_EXPENSE', 'DECREASE_BOND_RETURN');

-- DropIndex
DROP INDEX "StressTest_companyId_key";

-- AlterTable
ALTER TABLE "StressTest" DROP COLUMN "baselineInterestRate",
DROP COLUMN "expensesAndYear",
DROP COLUMN "impactedYears",
DROP COLUMN "increasePercentage",
DROP COLUMN "interestRate",
DROP COLUMN "interestRateDrop",
DROP COLUMN "investmentAmount",
DROP COLUMN "investmentRate",
DROP COLUMN "investmentRateDrop",
DROP COLUMN "loanPeriod",
DROP COLUMN "reinvestmentPercentage",
DROP COLUMN "stressTestInterestRate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" "StressTestType" NOT NULL;

-- CreateTable
CREATE TABLE "SimulateDropInInvestmentReturnRate" (
    "id" SERIAL NOT NULL,
    "stressTestId" INTEGER NOT NULL,
    "investmentAmount" INTEGER NOT NULL,
    "interestRate" DECIMAL(65,30) NOT NULL,
    "interestRateDrop" DECIMAL(65,30) NOT NULL,
    "impactedYears" INTEGER NOT NULL,
    "reinvestmentPercentage" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "SimulateDropInInvestmentReturnRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimulateDropInRevenueReturnRate" (
    "id" SERIAL NOT NULL,
    "stressTestId" INTEGER NOT NULL,
    "netSales" JSONB NOT NULL,
    "investmentRate" DECIMAL(65,30) NOT NULL,
    "investmentRateDrop" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "SimulateDropInRevenueReturnRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimulateOneTimeEventExpense" (
    "id" SERIAL NOT NULL,
    "stressTestId" INTEGER NOT NULL,
    "expense" INTEGER NOT NULL,
    "eventYear" INTEGER NOT NULL,

    CONSTRAINT "SimulateOneTimeEventExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimulateIncreaseInOperatingExpenses" (
    "id" SERIAL NOT NULL,
    "stressTestId" INTEGER NOT NULL,
    "expensesByYear" JSONB NOT NULL,
    "increasePercentage" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "SimulateIncreaseInOperatingExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimulateDecreaseInBondReturn" (
    "id" SERIAL NOT NULL,
    "stressTestId" INTEGER NOT NULL,
    "loanAmount" INTEGER NOT NULL,
    "loanPeriod" INTEGER NOT NULL,
    "baselineInterestRate" DECIMAL(65,30) NOT NULL,
    "stressTestInterestRate" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "SimulateDecreaseInBondReturn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SimulateDropInInvestmentReturnRate_stressTestId_key" ON "SimulateDropInInvestmentReturnRate"("stressTestId");

-- CreateIndex
CREATE UNIQUE INDEX "SimulateDropInRevenueReturnRate_stressTestId_key" ON "SimulateDropInRevenueReturnRate"("stressTestId");

-- CreateIndex
CREATE UNIQUE INDEX "SimulateOneTimeEventExpense_stressTestId_key" ON "SimulateOneTimeEventExpense"("stressTestId");

-- CreateIndex
CREATE UNIQUE INDEX "SimulateIncreaseInOperatingExpenses_stressTestId_key" ON "SimulateIncreaseInOperatingExpenses"("stressTestId");

-- CreateIndex
CREATE UNIQUE INDEX "SimulateDecreaseInBondReturn_stressTestId_key" ON "SimulateDecreaseInBondReturn"("stressTestId");

-- AddForeignKey
ALTER TABLE "SimulateDropInInvestmentReturnRate" ADD CONSTRAINT "SimulateDropInInvestmentReturnRate_stressTestId_fkey" FOREIGN KEY ("stressTestId") REFERENCES "StressTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimulateDropInRevenueReturnRate" ADD CONSTRAINT "SimulateDropInRevenueReturnRate_stressTestId_fkey" FOREIGN KEY ("stressTestId") REFERENCES "StressTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimulateOneTimeEventExpense" ADD CONSTRAINT "SimulateOneTimeEventExpense_stressTestId_fkey" FOREIGN KEY ("stressTestId") REFERENCES "StressTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimulateIncreaseInOperatingExpenses" ADD CONSTRAINT "SimulateIncreaseInOperatingExpenses_stressTestId_fkey" FOREIGN KEY ("stressTestId") REFERENCES "StressTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimulateDecreaseInBondReturn" ADD CONSTRAINT "SimulateDecreaseInBondReturn_stressTestId_fkey" FOREIGN KEY ("stressTestId") REFERENCES "StressTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
