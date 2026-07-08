import { prisma } from "@/lib/prisma";
import { buildSearchWhere } from "@/lib/filters";
import { ProductCard } from "@/components/ProductCard";

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const products = query
    ? await prisma.product.findMany({ where: buildSearchWhere(query), orderBy: { name: "asc" } })
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold uppercase">Tìm kiếm</h1>
      <form className="mb-8">
        <input
          name="q"
          defaultValue={query}
          placeholder="Tìm ultraboost, giày chạy, nmd..."
          className="w-full max-w-lg border border-neutral-300 px-4 py-2 focus:border-black focus:outline-none"
        />
      </form>

      {query && (
        <>
          <p className="mb-6 text-neutral-600">
            {products.length} kết quả cho &quot;{query}&quot;
          </p>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
