import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface filtro {
  dataInicial: Date;
  dataFinal: Date;
}

export async function POST(request: Request) {
  const filtro: filtro = await request.json();
  console.log(filtro);

  try {
    const pedidos = await prisma.motoboys.findMany({
      where: {
        pedidos: {
          some: {
            data: {
              gte: new Date(filtro.dataInicial),
              lt: new Date(
                new Date(filtro.dataFinal).setDate(
                  new Date(filtro.dataFinal).getDate() + 1
                )
              ),
            },
          },
        },
      },
      include: {
        pedidos: {
          where: {
            data: {
              gte: new Date(filtro.dataInicial),
              lt: new Date(
                new Date(filtro.dataFinal).setDate(
                  new Date(filtro.dataFinal).getDate() + 1
                )
              ),
            },
          },
          include: {
            cliente: true,
          },
        },
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
