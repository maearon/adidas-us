import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { AddressForm } from "./AddressForm";

export default async function AddressPage() {
  const session = await getSession();
  if (!session) redirect("/vn/login");

  const user = await prisma.user.findUnique({ where: { email: session.email } });
  if (!user) redirect("/vn/login");

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold uppercase">Địa chỉ giao hàng</h1>
      <AddressForm user={user} />
    </div>
  );
}
