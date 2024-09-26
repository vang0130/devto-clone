/*
  Warnings:

  - You are about to drop the column `name` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Comment_name_idx";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "name",
ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bio" SET DEFAULT '404 bio not found';

-- CreateIndex
CREATE INDEX "Comment_id_idx" ON "Comment"("id");
