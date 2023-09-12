/*
  Warnings:

  - Added the required column `updatedAt` to the `Containers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryNumber` to the `Entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Containers" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Entries" ADD COLUMN     "entryNumber" TEXT NOT NULL;
