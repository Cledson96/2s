import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { schema } from "./schema";

const prisma = new PrismaClient();

interface clientes {
  id: number | string;
  nome: string;
  email: string;
  telefone: string;
  telefone2: string;
}
function capitalizeFirstLetter(str: string): string {
  return str.replace(
    /\b\w+/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

export async function POST(request: Request) {
  try {
    const client: clientes = await request.json();
    const { error } = schema.validate(client);
    console.log(client);
    console.log(error?.message);

    if (error) {
      return NextResponse.json(
        { error: "Bad Request", message: error.message },
        { status: 400 }
      );
    }

    const verifyName = await prisma.clientes.findFirst({
      where: {
        nome: capitalizeFirstLetter(client.nome),
      },
    });
    const verifyEmail = await prisma.clientes.findFirst({
      where: {
        email: client.email,
      },
    });
    if (verifyEmail && verifyEmail.id !== Number(client.id)) {
      return NextResponse.json(
        { error: "Bad Request", message: "Email já cadastrado" },
        { status: 409 }
      );
    }
    if (verifyName && verifyName.id !== Number(client.id)) {
      return NextResponse.json(
        { error: "Bad Request", message: "Nome já cadastrado" },
        { status: 408 }
      );
    }

    await prisma.clientes.update({
      where: {
        id: Number(client.id),
      },
      data: {
        nome: capitalizeFirstLetter(client.nome),
        email: client.email,
        telefone: client.telefone,
        telefone2: client.telefone2,
      },
    });

    return NextResponse.json(
      { message: "Cliente atualizado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error },
      { status: 500 }
    );
  }
}
