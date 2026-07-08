import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/generated/prisma/client";
import { formatVnd, productImageUrl } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const hasSale = product.onSale === "sale" || (product.originalPriceUsd && product.originalPriceUsd > product.priceUsd);

  return (
    <Link href={`/vn/product?slot=${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={productImageUrl(product.id)}
          alt={product.name}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width:768px) 50vw, 25vw"
        />
        {hasSale && (
          <span className="absolute left-2 top-2 bg-red-600 px-2 py-0.5 text-xs font-bold text-white">SALE</span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-xs uppercase text-neutral-500">{product.gender || "unisex"}</p>
        <h3 className="mt-1 text-sm font-semibold leading-tight group-hover:underline">{product.name}</h3>
        {product.color && <p className="text-xs text-neutral-500">{product.color}</p>}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold">{formatVnd(product.priceUsd)}</span>
          {product.originalPriceUsd && product.originalPriceUsd > 0 && (
            <span className="text-sm text-neutral-400 line-through">{formatVnd(product.originalPriceUsd)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
