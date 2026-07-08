"use client";

import { productDetailImageUrl } from "@/lib/format";

export function ProductThumbnails({ productId }: { productId: number }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
      {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={n}
          src={productDetailImageUrl(productId, n)}
          alt=""
          width={80}
          height={80}
          style={{ cursor: "pointer", objectFit: "cover" }}
          onClick={() => {
            const el = document.getElementById("expandedImg") as HTMLImageElement | null;
            if (el) el.src = productDetailImageUrl(productId, n);
          }}
        />
      ))}
    </div>
  );
}
