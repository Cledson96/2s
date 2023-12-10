import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const motoboys = await prisma.motoboys.findMany({
      select: {
        id: true,
        nome: true,
      },
    });

    return NextResponse.json(motoboys, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error },
      { status: 500 }
    );
  }
}
