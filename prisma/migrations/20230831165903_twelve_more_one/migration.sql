/*
  Warnings:

  - Added the required column `warehouse` to the `Containers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Containers" ADD COLUMN     "warehouse" TEXT NOT NULL;
