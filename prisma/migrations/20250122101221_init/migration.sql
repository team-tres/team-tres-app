-- CreateTable
CREATE TABLE "IncomeStatement" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "costOfContracting" DOUBLE PRECISION NOT NULL,
    "overhead" DOUBLE PRECISION NOT NULL,
    "salariesAndBenefits" DOUBLE PRECISION NOT NULL,
    "rentAndOverhead" DOUBLE PRECISION NOT NULL,
    "depreciationAndAmortization" DOUBLE PRECISION NOT NULL,
    "interest" DOUBLE PRECISION NOT NULL,
    "interestIncome" DOUBLE PRECISION NOT NULL,
    "gainOnDisposalOfAssets" DOUBLE PRECISION NOT NULL,
    "otherIncome" DOUBLE PRECISION NOT NULL,
    "incomeTaxes" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "IncomeStatement_pkey" PRIMARY KEY ("id")
);
