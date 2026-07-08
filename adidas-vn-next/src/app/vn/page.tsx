import { prisma } from "@/lib/prisma";
import { buildProductWhere, parseFilterTokens } from "@/lib/filters";
import { ProductCard } from "@/components/ProductCard";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function CatalogPage({ searchParams }: Props) {
  const params = await searchParams;
  const rawKey = Object.keys(params)[0] ?? "";
  const tokens = rawKey
    ? parseFilterTokens(rawKey)
    : parseFilterTokens(Object.entries(params).map(([k, v]) => `${k}=${v}`).join("&"));
  const where = buildProductWhere(tokens);

  const products = await prisma.product.findMany({
    where,
    orderBy: { id: "asc" },
  });

  const title = tokens.length ? tokens.join(" / ").toUpperCase() : "Tất cả sản phẩm";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold uppercase">{title}</h1>
      <p className="mb-8 text-neutral-600">{products.length} sản phẩm</p>

      {products.length === 0 ? (
        <p className="text-neutral-500">Không tìm thấy sản phẩm phù hợp.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
