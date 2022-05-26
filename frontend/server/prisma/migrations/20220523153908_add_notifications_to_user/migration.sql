/*
  Warnings:

  - You are about to drop the column `profileId` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_profileId_fkey";

-- DropIndex
DROP INDEX "Notification_profileId_key";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "profileId";
ALTER TABLE "Notification" ADD COLUMN     "userId" INT8 NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Notification_userId_key" ON "Notification"("userId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
