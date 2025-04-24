/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `StressTest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StressTest_companyId_key" ON "StressTest"("companyId");
