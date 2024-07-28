/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "collegename" TEXT,
ADD COLUMN     "course" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "passingyear" TEXT,
ADD COLUMN     "profile" TEXT,
ADD COLUMN     "semester" TEXT,
ADD COLUMN     "student" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
