import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { formatVnd, productImageUrl } from "@/lib/format";
import { AddToCartButton, WishlistButton, CommentForm } from "@/components/CommerceButtons";
import { ProductCard } from "@/components/ProductCard";

type Props = { searchParams: Promise<{ slot?: string }> };

export default async function ProductPage({ searchParams }: Props) {
  const { slot } = await searchParams;
  const id = Number(slot);
  if (!id) notFound();

  const product = await prisma.product.findUnique({
    where: { id },
    include: { comments: { orderBy: { date: "desc" } } },
  });
  if (!product) notFound();

  const session = await getSession();
  let inWishlist = false;
  if (session?.email) {
    const w = await prisma.wishlistItem.findFirst({
      where: { productId: id, userEmail: session.email },
    });
    inWishlist = !!w;
  }

  const related = await prisma.product.findMany({
    where: {
      id: { not: id },
      OR: [
        { franchise: product.franchise || undefined },
        { sports: product.sports || undefined },
        { gender: product.gender || undefined },
      ],
    },
    take: 4,
  });

  const hasSale = product.onSale === "sale" || (product.originalPriceUsd && product.originalPriceUsd > product.priceUsd);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square bg-neutral-100">
          <Image src={productImageUrl(product.id, "detail")} alt={product.name} fill className="object-cover" priority />
        </div>
        <div>
          <p className="text-xs uppercase text-neutral-500">{product.gender} · {product.sports || product.category}</p>
          <h1 className="mt-2 text-2xl font-bold uppercase">{product.name}</h1>
          {product.color && <p className="mt-1 text-sm">{product.color} — {product.colorDetail}</p>}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-xl font-bold">{formatVnd(product.priceUsd)}</span>
            {product.originalPriceUsd && product.originalPriceUsd > 0 && (
              <span className="text-neutral-400 line-through">{formatVnd(product.originalPriceUsd)}</span>
            )}
            {hasSale && <span className="bg-red-600 px-2 py-0.5 text-xs font-bold text-white">SALE</span>}
          </div>
          <div className="mt-6 flex gap-3">
            <AddToCartButton productId={product.id} />
            {session && <WishlistButton productId={product.id} inWishlist={inWishlist} />}
          </div>
          {!session && (
            <p className="mt-4 text-sm text-neutral-500">
              <a href="/vn/login" className="underline">Đăng nhập</a> để thêm vào danh sách yêu thích.
            </p>
          )}
          <dl className="mt-8 space-y-2 text-sm">
            {product.franchise && <div><dt className="inline font-semibold">Franchise: </dt><dd className="inline">{product.franchise}</dd></div>}
            {product.brand && <div><dt className="inline font-semibold">Brand: </dt><dd className="inline">{product.brand}</dd></div>}
            {product.productType && <div><dt className="inline font-semibold">Loại: </dt><dd className="inline">{product.productType}</dd></div>}
          </dl>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="mb-4 text-lg font-bold">Bình luận ({product.comments.length})</h2>
        {product.comments.map((c) => (
          <div key={c.id} className="mb-4 border-b pb-4">
            <p className="font-semibold">{c.author}</p>
            <p className="text-xs text-neutral-500">{c.date.toLocaleDateString("vi-VN")}</p>
            <p className="mt-1 text-sm">{c.body}</p>
          </div>
        ))}
        <CommentForm productId={product.id} />
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-lg font-bold uppercase">Có thể bạn thích</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
