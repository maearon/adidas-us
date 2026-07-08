import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  await prisma.user.update({
    where: { email: session.email },
    data: {
      addressName: body.addressName ?? "",
      street: body.street ?? "",
      addressType: body.addressType ?? "",
      city: body.city ?? "",
      state: body.state ?? "",
      zipcode: body.zipcode ?? "",
      country: body.country ?? "",
      phone: body.phone ?? "",
    },
  });

  return NextResponse.json({ ok: true });
}
