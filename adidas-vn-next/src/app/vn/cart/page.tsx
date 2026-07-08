import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { formatVnd, productImageUrl } from "@/lib/format";
import { RemoveCartButton } from "@/components/CommerceButtons";

export default async function CartPage() {
  const session = await getSession();
  if (!session) redirect("/vn/login?redirect=/vn/cart");

  const items = await prisma.cartItem.findMany({
    where: { userEmail: session.email },
    include: { product: true },
  });

  const total = items.reduce((sum, i) => sum + i.product.priceUsd, 0);

  return (
    <main style={{ marginLeft: 320, padding: 20 }}>
      <h1>Giỏ hàng</h1>
      {items.length === 0 ? (
        <p>Giỏ hàng trống. <Link href="/vn">Tiếp tục mua sắm</Link></p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: 16, borderBottom: "1px solid #ccc", padding: "12px 0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={productImageUrl(item.product.id, item.product.image)} width={100} alt={item.product.name} />
              <div>
                <Link href={`/vn/product?slot=${item.product.id}`}>{item.product.name}</Link>
                <p>{formatVnd(item.product.priceUsd)}</p>
                <RemoveCartButton itemId={item.id} />
              </div>
            </div>
          ))}
          <p style={{ marginTop: 20, fontWeight: "bold" }}>Tổng: {formatVnd(total)}</p>
        </>
      )}
    </main>
  );
}
