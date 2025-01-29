/*
  Warnings:

  - Added the required column `income` to the `Stuff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stuff" ADD COLUMN     "income" DOUBLE PRECISION NOT NULL;
