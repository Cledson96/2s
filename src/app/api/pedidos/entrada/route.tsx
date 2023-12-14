import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { schema } from "./schema";

const prisma = new PrismaClient();

interface pedido {
  cliente_id: number;
  motoboy_id: number;
  expedido: number;
  insucesso: number;
  data: Date;
}

export async function POST(request: Request) {
  try {
    const order: pedido = await request.json();

    console.log(order);

    const { error } = schema.validate(order);

    if (error) {
      return NextResponse.json(
        { error: "Bad Request", message: error.message },
        { status: 400 }
      );
    }

    const existingOrder = await prisma.pedidos.findFirst({
      where: {
        cliente_id: order.cliente_id,
        motoboy_id: order.motoboy_id,
      },
    });
    if (existingOrder) {
      await prisma.pedidos.update({
        data: {
          expedido: order.expedido,
          insucesso: order.insucesso,
          data: order.data,
          cliente_id: order.cliente_id,
        },
        where: {
          id: existingOrder.id,
        },
      });
      return NextResponse.json(
        { message: "Pedido atualizado com sucesso" },
        { status: 202 }
      );
    }

    await prisma.pedidos.create({
      data: {
        expedido: order.expedido,
        insucesso: order.insucesso,
        data: order.data,
        cliente_id: order.cliente_id,
        motoboy_id: order.motoboy_id,
      },
    });

    return NextResponse.json(
      { message: "Pedido cadastrado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error },
      { status: 500 }
    );
  }
}
