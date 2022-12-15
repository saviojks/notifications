-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN "canceledAt" DATETIME;

-- RedefineIndex
DROP INDEX "Notifications_recepientId_idx";
CREATE INDEX "Notifications_recipientId_idx" ON "Notifications"("recipientId");
