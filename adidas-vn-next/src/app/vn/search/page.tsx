import { prisma } from "@/lib/prisma";
import { buildSearchWhere } from "@/lib/filters";
import { ProductCard } from "@/components/commerce/ProductCard";

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const products = query
    ? await prisma.product.findMany({ where: buildSearchWhere(query), orderBy: { name: "asc" } })
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold uppercase">Tìm kiếm</h1>
      <form className="mt-6 max-w-lg">
        <input
          name="q"
          defaultValue={query}
          placeholder="Ultraboost, giày chạy, nmd..."
          className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-black focus:outline-none"
        />
      </form>

      {query && (
        <>
          <p className="mt-6 text-sm text-neutral-600">{products.length} kết quả cho &quot;{query}&quot;</p>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
