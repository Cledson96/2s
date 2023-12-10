-- CreateTable
CREATE TABLE "motoboys" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "endereco" TEXT,
    "cpf" TEXT,
    "telefone" TEXT,
    "pix" TEXT,

    CONSTRAINT "motoboys_pkey" PRIMARY KEY ("id")
);
