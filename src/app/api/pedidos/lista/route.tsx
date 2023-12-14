import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface filtro {
  motoboy_id: number;
  data: Date;
}

export async function POST(request: Request) {
  const filtro: filtro = await request.json();

  try {
    const pedidos = await prisma.pedidos.findMany({
      where: {
        motoboy_id: filtro.motoboy_id,
        data: {
          gte: new Date(filtro.data), // "Greater than or equal" - Início do dia
          lt: new Date(
            new Date(filtro.data).setDate(new Date(filtro.data).getDate() + 1)
          ), // "Less than" - Início do dia seguinte
        },
      },
      include: {
        cliente: true,
        motoboy: true,
      },
    });

    return NextResponse.json(pedidos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error },
      { status: 500 }
    );
  }
}
