import { prisma } from "@/lib/prisma";
import { buildSearchWhere } from "@/lib/filters";
import { LegacyProductCardClient } from "@/components/legacy/LegacyProductCardClient";

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const products = query
    ? await prisma.product.findMany({ where: buildSearchWhere(query), orderBy: { name: "asc" } })
    : [];

  return (
    <main>
      <h1 style={{ marginLeft: 320, marginTop: 20 }}>Tìm kiếm</h1>
      <form className="search" action="/vn/search" method="get" style={{ marginLeft: 320, marginBottom: 20 }}>
        <input type="text" name="q" defaultValue={query} placeholder="tìm" />
        <input type="hidden" name="sitePath" value="vn" />
      </form>
      {query && (
        <>
          <p style={{ marginLeft: 320 }}>{products.length} kết quả cho &quot;{query}&quot;</p>
          {products.map((p) => (
            <LegacyProductCardClient key={p.id} product={p} />
          ))}
        </>
      )}
    </main>
  );
}
