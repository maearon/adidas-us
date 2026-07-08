import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { formatVnd, productImageUrl } from "@/lib/format";
import { LegacyProductCardClient } from "@/components/legacy/LegacyProductCardClient";

export default async function WishlistPage() {
  const session = await getSession();
  if (!session) redirect("/vn/login?redirect=/vn/wishlist");

  const items = await prisma.wishlistItem.findMany({
    where: { userEmail: session.email },
    include: { product: true },
  });

  return (
    <main>
      <h1 style={{ marginLeft: 320, marginTop: 20 }}>Danh sách yêu thích</h1>
      {items.length === 0 ? (
        <p style={{ marginLeft: 320 }}>Chưa có sản phẩm. <Link href="/vn">Khám phá</Link></p>
      ) : (
        items.map((item) => <LegacyProductCardClient key={item.id} product={item.product} />)
      )}
    </main>
  );
}
