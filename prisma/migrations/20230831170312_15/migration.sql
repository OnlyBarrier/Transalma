/*
  Warnings:

  - Added the required column `description` to the `Containers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Containers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Containers" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
