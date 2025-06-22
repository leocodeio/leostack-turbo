-- AlterTable
ALTER TABLE "subscription" ALTER COLUMN "planId" DROP NOT NULL,
ALTER COLUMN "planSlug" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "polarCheckoutId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "subscriptionId" TEXT;
