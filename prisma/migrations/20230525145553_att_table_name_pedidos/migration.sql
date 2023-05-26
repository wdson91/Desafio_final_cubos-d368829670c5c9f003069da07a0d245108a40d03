/*
  Warnings:

  - You are about to drop the `Pedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PedidoProdutos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "PedidoProdutos" DROP CONSTRAINT "PedidoProdutos_pedido_id_fkey";

-- DropForeignKey
ALTER TABLE "PedidoProdutos" DROP CONSTRAINT "PedidoProdutos_produto_id_fkey";

-- DropTable
DROP TABLE "Pedido";

-- DropTable
DROP TABLE "PedidoProdutos";

-- CreateTable
CREATE TABLE "Pedidos" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "oberservacao" TEXT,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PedidosToProdutos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PedidosToProdutos_AB_unique" ON "_PedidosToProdutos"("A", "B");

-- CreateIndex
CREATE INDEX "_PedidosToProdutos_B_index" ON "_PedidosToProdutos"("B");

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidosToProdutos" ADD CONSTRAINT "_PedidosToProdutos_A_fkey" FOREIGN KEY ("A") REFERENCES "Pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidosToProdutos" ADD CONSTRAINT "_PedidosToProdutos_B_fkey" FOREIGN KEY ("B") REFERENCES "Produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
