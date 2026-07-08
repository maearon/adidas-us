import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ message: "Nếu email tồn tại, link reset đã được gửi." });
  }

  const token = crypto.randomBytes(32).toString("hex");
  await prisma.user.update({
    where: { email },
    data: { resetToken: token, resetExpires: BigInt(Date.now() + 3600000) },
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return NextResponse.json({
    message: `Link reset: ${baseUrl}/vn/resetpassword?token=${token}`,
    redirect: `/vn/resetpassword?token=${token}`,
  });
}
