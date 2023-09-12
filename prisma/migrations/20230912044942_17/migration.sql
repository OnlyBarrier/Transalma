/*
  Warnings:

  - A unique constraint covering the columns `[idEntry]` on the table `Container` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idEntry` to the `Container` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Container" DROP CONSTRAINT "Container_blNumber_fkey";

-- AlterTable
ALTER TABLE "Container" ADD COLUMN     "idEntry" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Container_idEntry_key" ON "Container"("idEntry");

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_idEntry_fkey" FOREIGN KEY ("idEntry") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
