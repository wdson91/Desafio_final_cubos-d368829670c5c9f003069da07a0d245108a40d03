-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "oberservacao" TEXT,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoProdutos" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade_produto" INTEGER NOT NULL,
    "valor_produto" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PedidoProdutos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProdutos" ADD CONSTRAINT "PedidoProdutos_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProdutos" ADD CONSTRAINT "PedidoProdutos_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
