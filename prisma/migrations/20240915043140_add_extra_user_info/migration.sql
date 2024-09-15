/*
  Warnings:

  - You are about to drop the column `createdByName` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdByName` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Comment_createdByName_idx";

-- DropIndex
DROP INDEX "Post_createdByName_createdById_idx";

-- DropIndex
DROP INDEX "User_name_id_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "createdByName";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "createdByName";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Comment_name_idx" ON "Comment"("name");
