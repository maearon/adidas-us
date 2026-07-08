"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/generated/prisma/client";
import { formatVnd, productGenderLabel, productImageUrl } from "@/lib/format";
import { cn } from "@/lib/cn";

export function ProductCard({ product }: { product: Product }) {
  const main = productImageUrl(product.id, product.image);
  const hover = productImageUrl(product.id, product.imageHover || product.image);
  const [src, setSrc] = useState(main);
  const hasSale = product.onSale === "sale" || Boolean(product.originalPriceUsd && product.originalPriceUsd > product.priceUsd);

  return (
    <Link href={`/vn/product?slot=${product.id}`} className="group block">
      <article className="flex h-full flex-col">
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <Image
            src={src}
            alt={product.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes="(max-width:640px) 50vw, 25vw"
            onMouseEnter={() => setSrc(hover)}
            onMouseLeave={() => setSrc(main)}
          />
          {hasSale && (
            <span className="absolute left-2 top-2 bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
              Sale
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col pt-3">
          <p className="text-[11px] uppercase tracking-wide text-neutral-500">{productGenderLabel(product)}</p>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug group-hover:underline">
            {product.name}
          </h3>
          {product.color && <p className="mt-0.5 text-xs text-neutral-500">{product.color}</p>}
          <div className="mt-auto flex items-baseline gap-2 pt-2">
            <span className={cn("font-semibold", hasSale && "text-red-600")}>{formatVnd(product.priceUsd)}</span>
            {hasSale && product.originalPriceUsd && product.originalPriceUsd > 0 && (
              <span className="text-sm text-neutral-400 line-through">{formatVnd(product.originalPriceUsd)}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
