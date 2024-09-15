/*
  Warnings:

  - A unique constraint covering the columns `[name,id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Post_createdByName_idx";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "createdById" TEXT NOT NULL DEFAULT '000';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdById" TEXT NOT NULL DEFAULT '000';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "bio" SET DEFAULT '',
ALTER COLUMN "location" SET DEFAULT '',
ALTER COLUMN "website" SET DEFAULT '';

-- CreateIndex
CREATE INDEX "Post_createdByName_createdById_idx" ON "Post"("createdByName", "createdById");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_id_key" ON "User"("name", "id");
