import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { schema } from "./schema";

const prisma = new PrismaClient();

interface clientes {
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
    const user: clientes = await request.json();
    const { error } = schema.validate(user);

    if (error) {
      return NextResponse.json(
        { error: "Bad Request", message: error.message },
        { status: 400 }
      );
    }

    const existingUser = await prisma.clientes.findMany({
      where: {
        nome: capitalizeFirstLetter(user.nome),
      },
    });
    if (existingUser.length !== 0) {
      return NextResponse.json(
        { error: "Bad Request", message: "Cliente já cadastrado" },
        { status: 409 }
      );
    }

    await prisma.clientes.create({
      data: {
        nome: capitalizeFirstLetter(user.nome),
        email: user.email,
        telefone: user.telefone,
        telefone2: user.telefone2,
      },
    });

    return NextResponse.json(
      { message: "Cliente cadastrado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error },
      { status: 500 }
    );
  }
}
