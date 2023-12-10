-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "motoboy_id" INTEGER NOT NULL,
    "expedido" INTEGER NOT NULL,
    "insucesso" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "entrada" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_motoboy_id_fkey" FOREIGN KEY ("motoboy_id") REFERENCES "motoboys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
