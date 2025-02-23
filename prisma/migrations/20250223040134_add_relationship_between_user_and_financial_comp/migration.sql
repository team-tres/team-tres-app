/*
  Warnings:

  - Added the required column `userId` to the `FinancialCompilation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FinancialCompilation" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FinancialCompilation" ADD CONSTRAINT "FinancialCompilation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
