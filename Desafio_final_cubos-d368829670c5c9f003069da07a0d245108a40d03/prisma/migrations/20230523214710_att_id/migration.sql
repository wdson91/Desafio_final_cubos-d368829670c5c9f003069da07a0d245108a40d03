/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Produtos` table. All the data in the column will be lost.
  - Added the required column `categoria_id` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Produtos" DROP CONSTRAINT "Produtos_categoryId_fkey";

-- AlterTable
ALTER TABLE "Produtos" DROP COLUMN "categoryId",
ADD COLUMN     "categoria_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
