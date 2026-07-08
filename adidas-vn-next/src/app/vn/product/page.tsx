import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { formatVnd, productGenderLabel } from "@/lib/format";
import { AddToCartButton, WishlistButton, CommentForm } from "@/components/CommerceButtons";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { cn } from "@/lib/cn";

type Props = { searchParams: Promise<{ slot?: string; id?: string }> };

export default async function ProductPage({ searchParams }: Props) {
  const params = await searchParams;
  const productId = Number(params.slot ?? params.id);
  if (!productId) notFound();

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { comments: { orderBy: { date: "desc" } } },
  });
  if (!product) notFound();

  const session = await getSession();
  let inWishlist = false;
  if (session?.email) {
    inWishlist = !!(await prisma.wishlistItem.findFirst({
      where: { productId, userEmail: session.email },
    }));
  }

  const related = await prisma.product.findMany({
    where: {
      id: { not: productId },
      OR: [
        product.franchise ? { franchise: product.franchise } : {},
        product.sports ? { sports: product.sports } : {},
        product.gender ? { gender: product.gender } : {},
      ],
    },
    take: 4,
  });

  const hasSale = product.onSale === "sale" || Boolean(product.originalPriceUsd && product.originalPriceUsd > product.priceUsd);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <ProductGallery productId={product.id} productName={product.name} />

        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">{productGenderLabel(product)}</p>
          <h1 className="mt-2 text-2xl font-bold uppercase leading-tight md:text-3xl">{product.name}</h1>
          {product.color && (
            <p className="mt-2 text-sm text-neutral-600">{product.color} — {product.colorDetail}</p>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            <span className={cn("text-xl font-bold", hasSale && "text-red-600")}>{formatVnd(product.priceUsd)}</span>
            {hasSale && product.originalPriceUsd && product.originalPriceUsd > 0 && (
              <span className="text-neutral-400 line-through">{formatVnd(product.originalPriceUsd)}</span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCartButton productId={product.id} />
            {session && <WishlistButton productId={product.id} inWishlist={inWishlist} />}
          </div>

          <dl className="mt-8 space-y-2 border-t border-neutral-200 pt-6 text-sm">
            {product.franchise && <div><dt className="inline font-semibold">Franchise: </dt><dd className="inline capitalize">{product.franchise}</dd></div>}
            {product.brand && <div><dt className="inline font-semibold">Brand: </dt><dd className="inline capitalize">{product.brand}</dd></div>}
            {product.sports && <div><dt className="inline font-semibold">Môn: </dt><dd className="inline capitalize">{product.sports}</dd></div>}
          </dl>
        </div>
      </div>

      <section className="mt-16 border-t border-neutral-200 pt-10">
        <h2 className="text-lg font-bold">Bình luận ({product.comments.length})</h2>
        <div className="mt-4 space-y-4">
          {product.comments.map((c) => (
            <div key={c.id} className="border-b border-neutral-100 pb-4">
              <p className="font-semibold">{c.author}</p>
              <p className="text-xs text-neutral-500">{c.date.toLocaleDateString("vi-VN")}</p>
              <p className="mt-1 text-sm">{c.body}</p>
            </div>
          ))}
        </div>
        <CommentForm productId={product.id} />
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-lg font-bold uppercase">Có thể bạn thích</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
