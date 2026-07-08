"use client";

import type { Product } from "@/generated/prisma/client";
import Link from "next/link";
import { useState } from "react";
import { formatVnd, productGenderLabel, productImageUrl } from "@/lib/format";

export function LegacyProductCardClient({ product }: { product: Product }) {
  const main = productImageUrl(product.id, product.image);
  const hover = productImageUrl(product.id, product.imageHover || product.image);
  const [src, setSrc] = useState(main);
  const hasSale = Boolean(product.originalPriceUsd && product.originalPriceUsd > product.priceUsd);

  return (
    <Link href={`/vn/product?slot=${product.id}`}>
      <div className="product">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={product.name}
          onMouseEnter={() => setSrc(hover)}
          onMouseLeave={() => setSrc(main)}
          title={`adidas - ${product.name}`}
        />
        <h3 style={{ borderBottom: "1px solid #c8cbcc", height: "3em", lineHeight: "1em" }}>
          {product.name}
        </h3>
        {productGenderLabel(product)}
        <br />
        <h3>
          <span id="red" style={hasSale ? { color: "red" } : undefined}>
            {formatVnd(product.priceUsd)}
          </span>
          {hasSale && product.originalPriceUsd ? (
            <s>{formatVnd(product.originalPriceUsd)}</s>
          ) : null}
        </h3>
      </div>
    </Link>
  );
}
