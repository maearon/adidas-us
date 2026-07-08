import { prisma } from "@/lib/prisma";
import { buildProductWhere, parseFilterTokens } from "@/lib/filters";
import { LegacyProductCardClient } from "@/components/legacy/LegacyProductCardClient";

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

  const title = tokens.length ? tokens.join(" / ").toUpperCase() : "TẤT CẢ SẢN PHẨM";

  return (
    <main>
      <h1 style={{ marginLeft: 320, marginTop: 20 }}>{title}</h1>
      <p style={{ marginLeft: 320, marginBottom: 20 }}>{products.length} sản phẩm</p>
      {products.length === 0 ? (
        <p style={{ marginLeft: 320 }}>Không tìm thấy sản phẩm phù hợp.</p>
      ) : (
        products.map((p) => <LegacyProductCardClient key={p.id} product={p} />)
      )}
      <div className="pagination">
        <div style={{ float: "left", marginLeft: 0 }}>Sắp xếp theo: Tên sản phẩm [A-Z]</div>
        <div style={{ float: "left", marginLeft: 140 }}>Xem: {products.length}</div>
      </div>
    </main>
  );
}
