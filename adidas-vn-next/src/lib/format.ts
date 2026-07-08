export const VND_RATE = 23_000;

export function formatVnd(usd: number): string {
  return `${new Intl.NumberFormat("vi-VN").format(usd * VND_RATE)}₫`;
}

export function productImageUrl(id: number, variant: "main" | "hover" | "detail" = "main"): string {
  const suffix = variant === "hover" ? "h" : variant === "detail" ? "d" : "m";
  return `https://picsum.photos/seed/adidas-${id}-${suffix}/480/480`;
}
