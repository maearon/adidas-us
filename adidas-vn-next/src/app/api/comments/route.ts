import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { productId, author, body } = await req.json();
  if (!productId || !author || !body) {
    return NextResponse.json({ error: "Thiếu thông tin" }, { status: 400 });
  }

  await prisma.comment.create({
    data: {
      productId: Number(productId),
      author: String(author),
      body: String(body),
      date: new Date(),
    },
  });

  return NextResponse.json({ ok: true });
}
