/*
  Warnings:

  - Added the required column `image_key` to the `students` table without a default value. This is not possible if the table is not empty.
  - Made the column `image_url` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "students" ADD COLUMN     "image_key" TEXT NOT NULL,
ALTER COLUMN "image_url" SET NOT NULL;
