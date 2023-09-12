/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[blNumber]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invoice_customerId_key" ON "Invoice"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_blNumber_key" ON "Invoice"("blNumber");
