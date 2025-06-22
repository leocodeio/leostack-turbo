/*
  Warnings:

  - A unique constraint covering the columns `[polarOrderId]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subscription_polarOrderId_key" ON "subscription"("polarOrderId");
