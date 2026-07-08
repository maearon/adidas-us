import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Đăng nhập để thêm vào giỏ" }, { status: 401 });

  const { productId } = await req.json();
  const exists = await prisma.cartItem.findFirst({
    where: { productId, userEmail: session.email },
  });
  if (!exists) {
    await prisma.cartItem.create({
      data: { productId, userEmail: session.email },
    });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { itemId } = await req.json();
  await prisma.cartItem.deleteMany({
    where: { id: itemId, userEmail: session.email },
  });

  return NextResponse.json({ ok: true });
}
