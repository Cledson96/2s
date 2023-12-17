import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface filtro {
  email: string;
}

export async function POST(request: Request) {
  const filtro: filtro = await request.json();
  console.log(filtro);
  try {
    const validate = await prisma.admin.findUnique({
      where: {
        email: filtro.email,
      },
    });
    console.log(validate);
    if (validate) {
      return NextResponse.json({ message: true }, { status: 200 });
    }
    return NextResponse.json({ message: "Não cadastrado" }, { status: 409 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error },
      { status: 500 }
    );
  }
}
