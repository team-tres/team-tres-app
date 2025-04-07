-- CreateTable
CREATE TABLE "StressTest" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "investmentAmount" INTEGER NOT NULL,
    "interestRate" DECIMAL(65,30) NOT NULL,
    "interestRateDrop" DECIMAL(65,30) NOT NULL,
    "impactedYears" INTEGER NOT NULL,
    "reinvestmentPercentage" DECIMAL(65,30) NOT NULL,
    "investmentRate" DECIMAL(65,30) NOT NULL,
    "investmentRateDrop" DECIMAL(65,30) NOT NULL,
    "expensesAndYear" JSONB NOT NULL,
    "increasePercentage" DECIMAL(65,30) NOT NULL,
    "loanPeriod" INTEGER NOT NULL,
    "baselineInterestRate" DECIMAL(65,30) NOT NULL,
    "stressTestInterestRate" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "StressTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StressTest_companyId_key" ON "StressTest"("companyId");

-- AddForeignKey
ALTER TABLE "StressTest" ADD CONSTRAINT "StressTest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
