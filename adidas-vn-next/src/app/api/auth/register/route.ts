import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export async function POST(req: Request) {
  const { email, password, name, lastname } = await req.json();

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "Email đã được sử dụng" }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, 10),
      name,
      lastname,
    },
  });

  await createSession({ email: user.email, name: user.name, lastname: user.lastname });

  return NextResponse.json({ redirect: "/vn/login/profile" });
}
