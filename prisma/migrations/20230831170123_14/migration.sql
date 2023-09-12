/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Containers` table. All the data in the column will be lost.
  - You are about to drop the column `warehouse` on the `Containers` table. All the data in the column will be lost.
  - Added the required column `wareHouseName` to the `Containers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Containers" DROP COLUMN "updatedAt",
DROP COLUMN "warehouse",
ADD COLUMN     "wareHouseName" TEXT NOT NULL;
