/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Shipping" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT,
    "blNumber" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dimensions" TEXT,
    "volume" TEXT,
    "containerNumber" TEXT NOT NULL,
    "comments" TEXT,
    "active" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Shipping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shipping_userId_key" ON "Shipping"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Shipping_blNumber_key" ON "Shipping"("blNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_customerId_key" ON "Invoice"("customerId");
