/*
  Warnings:

  - Added the required column `userId` to the `StressTest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StressTest" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "StressTest" ADD CONSTRAINT "StressTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
