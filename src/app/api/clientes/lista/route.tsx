import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const clientes = await prisma.clientes.findMany();

    return NextResponse.json(clientes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error },
      { status: 500 }
    );
  }
}
