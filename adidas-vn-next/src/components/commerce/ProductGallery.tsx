"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { productDetailImageUrl } from "@/lib/format";
import { cn } from "@/lib/cn";

type Props = {
  productId: number;
  productName: string;
};

export function ProductGallery({ productId, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const mainSrc = productDetailImageUrl(productId, activeIndex);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightboxOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[88px_1fr]">
        <div className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-y-auto lg:max-h-[520px]">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setActiveIndex(n)}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden border-2 bg-neutral-100",
                activeIndex === n ? "border-black" : "border-transparent",
              )}
            >
              <Image src={productDetailImageUrl(productId, n)} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="relative order-1 aspect-square w-full overflow-hidden bg-neutral-100 lg:order-2"
          onClick={() => setLightboxOpen(true)}
          aria-label="Phóng to ảnh sản phẩm"
        >
          <Image src={mainSrc} alt={productName} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" priority />
          <span className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 text-xs text-white">Click để phóng to</span>
        </button>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-4 top-4 text-3xl text-white"
            onClick={() => setLightboxOpen(false)}
            aria-label="Đóng"
          >
            ×
          </button>
          <div className="relative h-[min(90vh,800px)] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={mainSrc} alt={productName} fill className="object-contain" sizes="90vw" />
          </div>
        </div>
      )}
    </>
  );
}
