import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { schema } from "./schema";

const prisma = new PrismaClient();

interface admin {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: string;
  pix: string;
}
function capitalizeFirstLetter(str: string): string {
  return str.replace(
    /\b\w+/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

export async function POST(request: Request) {
  try {
    const user: any = await request.json();
    const { error } = schema.validate(user);

    if (error) {
      return NextResponse.json(
        { error: "Bad Request", message: error.message },
        { status: 400 }
      );
    }
    const administer = user.administrador === "Sim" ? true : false;
    const ativo = user.ativo === "Sim" ? true : false;
    const verifyEmail = await prisma.admin.findFirst({
      where: {
        email: user.email,
      },
    });

    if (verifyEmail && verifyEmail.id !== user.id) {
      return NextResponse.json(
        { error: "Bad Request", message: "Email já cadastrado" },
        { status: 409 }
      );
    }

    await prisma.admin.update({
      where: {
        id: user.id,
      },
      data: {
        nome: capitalizeFirstLetter(user.nome),
        email: user.email,
        telefone: user.telefone,
        administrador: administer,
        ativo: ativo,
        pix: user.pix,
        foto: user.foto,
      },
    });

    return NextResponse.json(
      { message: "Motoboy atualizado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error },
      { status: 500 }
    );
  }
}
