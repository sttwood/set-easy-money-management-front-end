/*
  Warnings:

  - The primary key for the `Savings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Savings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Income` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_user_id_fkey";

-- AlterTable
ALTER TABLE "Savings" DROP CONSTRAINT "Savings_pkey",
ALTER COLUMN "interest" DROP NOT NULL,
ALTER COLUMN "present_amount" DROP NOT NULL,
ALTER COLUMN "total_amount" DROP NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Savings_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Expense";

-- DropTable
DROP TABLE "Income";

-- CreateTable
CREATE TABLE "IncomeExpense" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IncomeExpense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IncomeExpense" ADD CONSTRAINT "IncomeExpense_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeExpense" ADD CONSTRAINT "IncomeExpense_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
