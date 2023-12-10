import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { schema } from "./schema";

const prisma = new PrismaClient();

interface motoboy {
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
    const user: motoboy = await request.json();
    const { error } = schema.validate(user);

    if (error) {
      return NextResponse.json(
        { error: "Bad Request", message: error.message },
        { status: 400 }
      );
    }

    const existingUser = await prisma.motoboys.findMany({
      where: {
        email: user.email,
      },
    });
    if (existingUser.length !== 0) {
      return NextResponse.json(
        { error: "Bad Request", message: "Email já cadastrado" },
        { status: 409 }
      );
    }

    await prisma.motoboys.create({
      data: {
        nome: capitalizeFirstLetter(user.nome),
        email: user.email,
        telefone: user.telefone,
        cpf: user.cpf,
        endereco: user.endereco,
        pix: user.pix,
      },
    });

    return NextResponse.json(
      { message: "Motoboy cadastrado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error },
      { status: 500 }
    );
  }
}
