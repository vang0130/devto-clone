/*
  Warnings:

  - You are about to drop the column `createdById` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdByName` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdByName` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "createdById",
ADD COLUMN     "createdByName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "createdById",
ADD COLUMN     "createdByName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'John Doe';

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Comment_createdByName_idx" ON "Comment"("createdByName");

-- CreateIndex
CREATE INDEX "Post_createdByName_idx" ON "Post"("createdByName");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
