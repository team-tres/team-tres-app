/*
  Warnings:

  - You are about to drop the column `totalLongTermAsset` on the `FinancialCompilation` table. All the data in the column will be lost.
  - Added the required column `totalAssets` to the `FinancialCompilation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalLongTermAssets` to the `FinancialCompilation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FinancialCompilation" DROP COLUMN "totalLongTermAsset",
ADD COLUMN     "totalAssets" INTEGER NOT NULL,
ADD COLUMN     "totalLongTermAssets" INTEGER NOT NULL;
