-- CreateTable
CREATE TABLE "CompanySetting" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "revenue" TEXT NOT NULL,
    "costOfContracting" TEXT NOT NULL,
    "overhead" TEXT NOT NULL,
    "salariesAndBenefits" TEXT NOT NULL,
    "rentAndOverhead" TEXT NOT NULL,
    "depreciationAndAmortization" TEXT NOT NULL,
    "interest" TEXT NOT NULL,
    "profitFromOperations" TEXT NOT NULL,
    "interestIncome" TEXT NOT NULL,
    "interestExpense" TEXT NOT NULL,
    "gainOnDisposalOfAssets" TEXT NOT NULL,
    "otherIncome" TEXT NOT NULL,
    "incomeTaxes" TEXT NOT NULL,
    "cashAndCashEquivalents" TEXT NOT NULL,
    "accountsReceivable" TEXT NOT NULL,
    "inventory" TEXT NOT NULL,
    "propertyPlantAndEquipment" TEXT NOT NULL,
    "investment" TEXT NOT NULL,
    "accountsPayable" TEXT NOT NULL,
    "taxesPayable" TEXT NOT NULL,
    "currentDebtService" TEXT NOT NULL,
    "loansPayable" TEXT NOT NULL,
    "longDebtService" TEXT NOT NULL,
    "equityCapital" TEXT NOT NULL,
    "retainedEarnings" TEXT NOT NULL,

    CONSTRAINT "CompanySetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyMultiplier" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "revenue" DECIMAL(65,30) NOT NULL,
    "costOfContracting" DECIMAL(65,30) NOT NULL,
    "overhead" DECIMAL(65,30) NOT NULL,
    "salariesAndBenefits" DECIMAL(65,30) NOT NULL,
    "rentAndOverhead" DECIMAL(65,30) NOT NULL,
    "depreciationAndAmortization" DECIMAL(65,30) NOT NULL,
    "interest" DECIMAL(65,30) NOT NULL,
    "profitFromOperations" DECIMAL(65,30) NOT NULL,
    "interestIncome" DECIMAL(65,30) NOT NULL,
    "interestExpense" DECIMAL(65,30) NOT NULL,
    "gainOnDisposalOfAssets" DECIMAL(65,30) NOT NULL,
    "otherIncome" DECIMAL(65,30) NOT NULL,
    "incomeTaxes" DECIMAL(65,30) NOT NULL,
    "cashAndCashEquivalents" DECIMAL(65,30) NOT NULL,
    "accountsReceivable" DECIMAL(65,30) NOT NULL,
    "inventory" DECIMAL(65,30) NOT NULL,
    "propertyPlantAndEquipment" DECIMAL(65,30) NOT NULL,
    "investment" DECIMAL(65,30) NOT NULL,
    "accountsPayable" DECIMAL(65,30) NOT NULL,
    "taxesPayable" DECIMAL(65,30) NOT NULL,
    "currentDebtService" DECIMAL(65,30) NOT NULL,
    "loansPayable" DECIMAL(65,30) NOT NULL,
    "longDebtService" DECIMAL(65,30) NOT NULL,
    "equityCapital" DECIMAL(65,30) NOT NULL,
    "retainedEarnings" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "CompanyMultiplier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanySetting_companyId_key" ON "CompanySetting"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyMultiplier_companyId_key" ON "CompanyMultiplier"("companyId");

-- AddForeignKey
ALTER TABLE "CompanySetting" ADD CONSTRAINT "CompanySetting_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMultiplier" ADD CONSTRAINT "CompanyMultiplier_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
