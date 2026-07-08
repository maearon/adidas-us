import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { token, password } = await req.json();
  if (!token || !password) {
    return NextResponse.json({ error: "Thiếu thông tin" }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetExpires: { gt: BigInt(Date.now()) },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Token không hợp lệ hoặc đã hết hạn" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await bcrypt.hash(password, 10),
      resetToken: null,
      resetExpires: BigInt(0),
    },
  });

  return NextResponse.json({ redirect: "/vn/login" });
}
