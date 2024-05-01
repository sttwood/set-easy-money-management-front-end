/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `interestRate` on the `Savings` table. All the data in the column will be lost.
  - You are about to drop the column `presentAmount` on the `Savings` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Savings` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interest_rate` to the `Savings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `present_amount` to the `Savings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `Savings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Savings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_userId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_userId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "categoryId",
DROP COLUMN "userId",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "categoryId",
DROP COLUMN "userId",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Savings" DROP COLUMN "interestRate",
DROP COLUMN "presentAmount",
DROP COLUMN "totalAmount",
ADD COLUMN     "interest_rate" TEXT NOT NULL,
ADD COLUMN     "present_amount" TEXT NOT NULL,
ADD COLUMN     "total_amount" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "email_verified" TIMESTAMP(3),
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Savings" ADD CONSTRAINT "Savings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
