/*
  Warnings:

  - A unique constraint covering the columns `[polarCheckoutId]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "subscription_polarCheckoutId_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "subscription_polarCheckoutId_key" ON "subscription"("polarCheckoutId");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_userId_key" ON "subscription"("userId");
