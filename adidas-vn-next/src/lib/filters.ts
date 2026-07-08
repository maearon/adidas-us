import type { Prisma } from "@/generated/prisma/client";

const GENDERS = ["men", "women", "boys", "girls", "kids"] as const;
const FRANCHISES = [
  "deerupt", "nmd", "ultraboost", "arkyn", "superstar", "alphabounce", "pureboost",
  "predator", "x", "nemeziz", "copa", "crazy_explosive", "stan_smith", "zne", "eqt",
  "gazelle", "campus", "tubular", "iconics", "adicolor", "i_5923", "swift", "spzl",
  "adilaette", "adizero", "supernova", "mad", "podsystem",
];
const BRANDS = ["originals", "athletics", "essentials"];
const SPORTS = [
  "running", "soccer", "basketball", "training", "football", "outdoor", "tennis",
  "skateboarding", "baseball", "weightlifting", "golf", "hockey", "lacrosse", "yoga", "volleyball",
];
const PRODUCT_TYPES = [
  "cleat", "slides", "hoodies_sweatshirts", "jackets", "short_sleeve_shirts", "t_shirts",
  "long_sleeve_shirts", "jerseys", "tights", "shorts", "tank_tops", "underwear", "bags", "hats",
  "socks", "phone_cases", "sunglasses", "balls", "watches", "gloves", "scarves", "pants", "bras",
  "dresses_and_skirts", "headbands", "beanie", "hoddie", "hodie", "tee",
];
const CATEGORIES = ["shoes", "compression", "accessories", "apparel", "polo"];

export function parseFilterTokens(raw: string | string[] | undefined): string[] {
  if (!raw) return [];
  const value = Array.isArray(raw) ? raw.join("-") : raw;
  return value
    .replace(/^\?/, "")
    .split(/[-\s]+/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

export function buildProductWhere(tokens: string[]): Prisma.ProductWhereInput {
  if (tokens.length === 0) return {};

  const and: Prisma.ProductWhereInput[] = [];

  for (const token of tokens) {
    if (token === "new_arrivals" || token === "best-seller" || token === "release-dates" || token === "grid" || token === "true") {
      continue;
    }

    if (GENDERS.includes(token as (typeof GENDERS)[number])) {
      and.push({ gender: { equals: token, mode: "insensitive" } });
      continue;
    }

    if (FRANCHISES.includes(token)) {
      and.push({ franchise: { equals: token, mode: "insensitive" } });
      continue;
    }

    if (BRANDS.includes(token)) {
      and.push({ brand: { equals: token, mode: "insensitive" } });
      continue;
    }

    if (SPORTS.includes(token)) {
      and.push({ sports: { equals: token, mode: "insensitive" } });
      continue;
    }

    if (PRODUCT_TYPES.includes(token)) {
      and.push({ productType: { equals: token, mode: "insensitive" } });
      continue;
    }

    if (CATEGORIES.includes(token)) {
      and.push({ category: { equals: token, mode: "insensitive" } });
      continue;
    }

    if (token === "customizable") {
      and.push({ miAdidas: { equals: "customizable", mode: "insensitive" } });
      continue;
    }

    if (token === "sale") {
      and.push({ onSale: { equals: "sale", mode: "insensitive" } });
    }
  }

  return and.length ? { AND: and } : {};
}

export function buildSearchWhere(query: string): Prisma.ProductWhereInput {
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return {};

  return {
    AND: terms.map((term) => ({
      OR: [
        { name: { contains: term, mode: "insensitive" } },
        { franchise: { contains: term, mode: "insensitive" } },
        { brand: { contains: term, mode: "insensitive" } },
        { sports: { contains: term, mode: "insensitive" } },
        { category: { contains: term, mode: "insensitive" } },
        { gender: { contains: term, mode: "insensitive" } },
        { color: { contains: term, mode: "insensitive" } },
      ],
    })),
  };
}

export const NAV_LINKS = {
  men: [
    { label: "Giày Chạy Bộ", href: "/vn?men-running-shoes" },
    { label: "Ultraboost", href: "/vn?men-ultraboost" },
    { label: "NMD", href: "/vn?men-nmd" },
    { label: "Bóng Đá", href: "/vn?men-soccer" },
    { label: "Sale", href: "/vn?men-sale" },
  ],
  women: [
    { label: "Giày Chạy Bộ", href: "/vn?women-running-shoes" },
    { label: "Ultraboost", href: "/vn?women-ultraboost" },
    { label: "Tubular", href: "/vn?women-tubular" },
    { label: "Sale", href: "/vn?women-sale" },
  ],
  kids: [
    { label: "Trẻ Em", href: "/vn?kids" },
    { label: "Giày", href: "/vn?kids-shoes" },
    { label: "Quần Áo", href: "/vn?kids-apparel" },
  ],
};
