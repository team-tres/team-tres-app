/*
  Warnings:

  - Added the required column `totalAssets` to the `FinancialCompilation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FinancialCompilation" ADD COLUMN     "totalAssets" INTEGER NOT NULL;
