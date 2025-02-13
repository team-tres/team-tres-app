-- AddForeignKey
ALTER TABLE "FinancialCompilation" ADD CONSTRAINT "FinancialCompilation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
