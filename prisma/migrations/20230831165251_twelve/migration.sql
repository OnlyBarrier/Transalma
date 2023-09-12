/*
  Warnings:

  - Changed the type of `entryNumber` on the `Entries` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Entries" DROP COLUMN "entryNumber",
ADD COLUMN     "entryNumber" INTEGER NOT NULL;
