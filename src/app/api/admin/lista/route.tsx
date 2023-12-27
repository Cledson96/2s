import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const usuarios = await prisma.admin.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        foto: true,
        ativo: true,
        pix: true,
        administrador: true,
      },
    });

    return NextResponse.json(usuarios, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error },
      { status: 500 }
    );
  }
}
