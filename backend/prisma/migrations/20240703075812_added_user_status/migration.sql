-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('Pending', 'Approved', 'Rejected');

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "status" "user_status" NOT NULL DEFAULT 'Pending';
