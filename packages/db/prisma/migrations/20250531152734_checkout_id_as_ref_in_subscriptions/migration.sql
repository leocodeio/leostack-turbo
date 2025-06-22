/*
  Warnings:

  - You are about to drop the column `polarOrderId` on the `subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[polarCheckoutId]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `polarCheckoutId` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "subscription_polarOrderId_key";

-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "polarOrderId",
ADD COLUMN     "polarCheckoutId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "subscription_polarCheckoutId_key" ON "subscription"("polarCheckoutId");
