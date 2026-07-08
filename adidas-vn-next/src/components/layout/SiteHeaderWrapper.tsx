import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { SiteHeaderClient } from "./SiteHeader";

export async function SiteHeader() {
  const session = await getSession();
  let wishlistCount = 0;
  if (session?.email) {
    wishlistCount = await prisma.wishlistItem.count({ where: { userEmail: session.email } });
  }

  return <SiteHeaderClient session={session} wishlistCount={wishlistCount} />;
}
