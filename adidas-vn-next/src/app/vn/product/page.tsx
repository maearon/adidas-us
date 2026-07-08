import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { formatVnd, productDetailImageUrl, productGenderLabel, productImageUrl } from "@/lib/format";
import { AddToCartButton, WishlistButton, CommentForm } from "@/components/CommerceButtons";
import { LegacyProductCardClient } from "@/components/legacy/LegacyProductCardClient";
import { ProductThumbnails } from "@/components/legacy/ProductThumbnails";

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
    inWishlist = !!(await prisma.wishlistItem.findFirst({
      where: { productId: id, userEmail: session.email },
    }));
  }

  const related = await prisma.product.findMany({
    where: {
      id: { not: id },
      OR: [
        product.franchise ? { franchise: product.franchise } : {},
        product.sports ? { sports: product.sports } : {},
        product.gender ? { gender: product.gender } : {},
      ],
    },
    take: 4,
  });

  const hasSale = product.onSale === "sale" || (product.originalPriceUsd && product.originalPriceUsd > product.priceUsd);

  return (
    <>
      <link rel="stylesheet" href="/css/product/product.css" />
      <Script src="/js/zoom.js" strategy="afterInteractive" />

      <div data-auto-id="glass-image-viewer" className="glass_image_viewer___3pD5T" style={{ backgroundColor: "#eceef0", backgroundSize: "50% 100%!important" }}>
        <div data-auto-id="images_container" className="images_container___3KxTB" style={{ marginLeft: -250 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="expandedImg"
            className="performance-item"
            alt={product.name}
            src={productDetailImageUrl(product.id, 1)}
          />
          <div id="myresult" className="img-zoom-result" style={{ display: "none" }} />
        </div>
      </div>

      <main style={{ marginLeft: 320, padding: "20px 10px" }}>
        <h1>{product.name}</h1>
        {product.color && <p>{product.color} — {product.colorDetail}</p>}
        <p>{productGenderLabel(product)}</p>
        <h3>
          <span id="red" style={hasSale ? { color: "red" } : undefined}>{formatVnd(product.priceUsd)}</span>
          {product.originalPriceUsd && product.originalPriceUsd > 0 ? (
            <s>{formatVnd(product.originalPriceUsd)}</s>
          ) : null}
        </h3>

        <div style={{ display: "flex", gap: 12, margin: "16px 0" }}>
          <AddToCartButton productId={product.id} />
          {session && <WishlistButton productId={product.id} inWishlist={inWishlist} />}
        </div>

        <ProductThumbnails productId={product.id} />

        <section style={{ marginTop: 32 }}>
          <h2>Bình luận ({product.comments.length})</h2>
          {product.comments.map((c) => (
            <div key={c.id} style={{ borderBottom: "1px solid #ccc", padding: "12px 0" }}>
              <strong>{c.author}</strong>
              <div style={{ fontSize: 12, color: "#666" }}>{c.date.toLocaleDateString("vi-VN")}</div>
              <p>{c.body}</p>
            </div>
          ))}
          <CommentForm productId={product.id} />
        </section>

        {related.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2>Có thể bạn thích</h2>
            {related.map((p) => (
              <LegacyProductCardClient key={p.id} product={p} />
            ))}
          </section>
        )}
      </main>
    </>
  );
}
