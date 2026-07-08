import { prisma } from "@/lib/prisma";
import { buildProductWhere, parseFilterTokens } from "@/lib/filters";
import { ProductCard } from "@/components/commerce/ProductCard";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function CatalogPage({ searchParams }: Props) {
  const params = await searchParams;
  const rawKey = Object.keys(params)[0] ?? "";
  const tokens = rawKey
    ? parseFilterTokens(rawKey)
    : parseFilterTokens(Object.entries(params).map(([k, v]) => `${k}=${v}`).join("&"));
  const where = buildProductWhere(tokens);
  const title = tokens.length ? tokens.join(" / ").toUpperCase() : "TẤT CẢ SẢN PHẨM";

  const products = await prisma.product.findMany({ where, orderBy: { id: "asc" } });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 border-b border-neutral-200 pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wide">{title}</h1>
        <p className="mt-1 text-sm text-neutral-600">{products.length} sản phẩm</p>
      </div>

      {products.length === 0 ? (
        <p className="text-neutral-500">Không tìm thấy sản phẩm phù hợp.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
