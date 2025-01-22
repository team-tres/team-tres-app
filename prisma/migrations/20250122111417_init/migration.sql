-- CreateTable
CREATE TABLE "BalanceSheet" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "cashAndCashEquivalents" DOUBLE PRECISION NOT NULL,
    "accountsReceivable" DOUBLE PRECISION NOT NULL,
    "inventory" DOUBLE PRECISION NOT NULL,
    "propertyPlantAndEquipment" DOUBLE PRECISION NOT NULL,
    "investment" DOUBLE PRECISION NOT NULL,
    "accountsPayable" DOUBLE PRECISION NOT NULL,
    "longDebtService" DOUBLE PRECISION NOT NULL,
    "taxesPayable" DOUBLE PRECISION NOT NULL,
    "currentDebtService" DOUBLE PRECISION NOT NULL,
    "loansPayable" DOUBLE PRECISION NOT NULL,
    "equityCapital" DOUBLE PRECISION NOT NULL,
    "retainedEarnings" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BalanceSheet_pkey" PRIMARY KEY ("id")
);
