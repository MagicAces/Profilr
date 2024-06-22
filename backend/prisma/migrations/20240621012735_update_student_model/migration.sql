/*
  Warnings:

  - Added the required column `gender` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_no` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "gender" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "gender" "gender" NOT NULL,
ADD COLUMN     "phone_no" TEXT NOT NULL;
