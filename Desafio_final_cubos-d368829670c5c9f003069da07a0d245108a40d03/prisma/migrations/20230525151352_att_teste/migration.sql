/*
  Warnings:

  - You are about to drop the `_PedidosToProdutos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PedidosToProdutos" DROP CONSTRAINT "_PedidosToProdutos_A_fkey";

-- DropForeignKey
ALTER TABLE "_PedidosToProdutos" DROP CONSTRAINT "_PedidosToProdutos_B_fkey";

-- AlterTable
ALTER TABLE "Pedidos" ADD COLUMN     "produtosId" INTEGER;

-- DropTable
DROP TABLE "_PedidosToProdutos";

-- CreateTable
CREATE TABLE "PedidoProduto" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade_produto" INTEGER NOT NULL,
    "valor_produto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PedidoProduto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_produtosId_fkey" FOREIGN KEY ("produtosId") REFERENCES "Produtos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProduto" ADD CONSTRAINT "PedidoProduto_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProduto" ADD CONSTRAINT "PedidoProduto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
