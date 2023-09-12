/*
  Warnings:

  - You are about to drop the column `containerCuantity` on the `Entries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entries" DROP COLUMN "containerCuantity",
ADD COLUMN     "containerQuantity" TEXT;
