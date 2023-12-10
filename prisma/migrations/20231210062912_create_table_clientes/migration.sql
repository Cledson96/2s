-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "email" VARCHAR(150),
    "telefone" TEXT,
    "telefone2" TEXT,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);
