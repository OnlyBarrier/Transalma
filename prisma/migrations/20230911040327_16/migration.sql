/*
  Warnings:

  - You are about to drop the `Containers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Entries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Containers";

-- DropTable
DROP TABLE "Entries";

-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "sealNumber" TEXT NOT NULL,
    "blNumber" TEXT,
    "containerNumbers" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "comments" TEXT,
    "containerQuantity" TEXT,
    "active" BOOLEAN NOT NULL,
    "entryNumber" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Container" (
    "id" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "wareHouseName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "blNumber" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "observations" TEXT,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entry_userId_key" ON "Entry"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_sealNumber_key" ON "Entry"("sealNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_blNumber_key" ON "Entry"("blNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Container_ruc_key" ON "Container"("ruc");

-- CreateIndex
CREATE UNIQUE INDEX "Container_blNumber_key" ON "Container"("blNumber");

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_blNumber_fkey" FOREIGN KEY ("blNumber") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_fkey" FOREIGN KEY ("id") REFERENCES "Container"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
