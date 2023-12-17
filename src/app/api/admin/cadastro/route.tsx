import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { admin } from "@/interface";
import { schema } from "./schema";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

function capitalizeFirstLetter(str: string): string {
  return str.replace(
    /\b\w+/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

export async function POST(request: Request) {
  try {
    const user: admin = await request.json();
    const { error } = schema.validate(user);

    if (error) {
      return NextResponse.json(
        { error: "Bad Request", message: error.message },
        { status: 400 }
      );
    }

    const existingUser = await prisma.admin.findMany({
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

    const senhaCriptografada = await bcrypt.hash(user.senha, 10);

    const test = await prisma.admin.create({
      data: {
        nome: capitalizeFirstLetter(user.nome),
        email: user.email.toLowerCase(),
        telefone: user.telefone,
        senha: senhaCriptografada,
        pix: user.pix,
        administrador: user.administrador === "true" ? true : false,
        ativo: true,
      },
    });

    return NextResponse.json(
      { message: "Usuário cadastrado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error },
      { status: 500 }
    );
  }
}
