import type { Product } from "@/generated/prisma/client";

export const VND_RATE = 23_000;

export function formatVnd(usd: number): string {
  return `${new Intl.NumberFormat("vi-VN").format(usd * VND_RATE)}₫`;
}

export function productImageUrl(productId: number, filename: string): string {
  return `/images/${productId}/${filename}`;
}

export function productDetailImageUrl(productId: number, index = 1): string {
  return `/images/${productId}/${productId}dt${index}.jpg`;
}

export function productGenderLabel(product: Pick<Product, "gender" | "age" | "brand" | "sports">): string {
  const parts: string[] = [];
  if (!product.age || product.age !== "infant_toddler") {
    if (product.gender === "kids") parts.push("kids unisex");
    else if (product.gender && product.gender !== "boys" && product.gender !== "girls") {
      parts.push(`${product.gender}'s`);
    } else if (product.gender) {
      parts.push(product.gender);
    }
  } else {
    parts.push("infants");
  }
  if (product.brand) parts.push(product.brand);
  if (product.sports) parts.push(product.sports);
  return parts.join(" ");
}
