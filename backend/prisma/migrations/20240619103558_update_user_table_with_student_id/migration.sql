/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `program` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "program" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "students_user_id_key" ON "students"("user_id");
