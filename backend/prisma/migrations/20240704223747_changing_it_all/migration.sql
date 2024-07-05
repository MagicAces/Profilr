/*
  Warnings:

  - You are about to drop the column `status` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_user_id_fkey";

-- DropIndex
DROP INDEX "students_user_id_key";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "status",
DROP COLUMN "user_id";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "user_status";
