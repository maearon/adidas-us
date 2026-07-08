import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { formatVnd, productImageUrl } from "@/lib/format";

export default async function WishlistPage() {
  const session = await getSession();
  if (!session) redirect("/vn/login?redirect=/vn/wishlist");

  const items = await prisma.wishlistItem.findMany({
    where: { userEmail: session.email },
    include: { product: true },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold uppercase">Danh sách yêu thích</h1>

      {items.length === 0 ? (
        <div className="text-center">
          <p className="text-neutral-500">Chưa có sản phẩm yêu thích.</p>
          <Link href="/vn" className="mt-4 inline-block underline">Khám phá sản phẩm</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id}>
              <Link href={`/vn/product?slot=${item.product.id}`}>
                <div className="relative aspect-square bg-neutral-100">
                  <Image src={productImageUrl(item.product.id)} alt={item.product.name} fill className="object-cover" />
                </div>
                <h3 className="mt-2 text-sm font-semibold hover:underline">{item.product.name}</h3>
                <p className="font-semibold">{formatVnd(item.product.priceUsd)}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
