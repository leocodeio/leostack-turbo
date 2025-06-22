/*
  Warnings:

  - A unique constraint covering the columns `[polarCheckoutId,userId]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "subscription_polarCheckoutId_key";

-- CreateIndex
CREATE UNIQUE INDEX "subscription_polarCheckoutId_userId_key" ON "subscription"("polarCheckoutId", "userId");
