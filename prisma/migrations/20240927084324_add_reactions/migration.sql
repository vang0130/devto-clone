-- CreateEnum
CREATE TYPE "Emoji" AS ENUM ('HEART', 'UNICORN', 'SURPRISE', 'CLAP', 'FIRE');

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "emoji" "Emoji" NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_postId_userId_emoji_key" ON "Reaction"("postId", "userId", "emoji");
