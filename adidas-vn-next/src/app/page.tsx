import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    where: { OR: [{ franchise: "ultraboost" }, { franchise: "nmd" }, { onSale: "sale" }] },
    take: 8,
    orderBy: { id: "asc" },
  });

  const newArrivals = await prisma.product.findMany({
    take: 4,
    orderBy: { releaseDate: "desc" },
  });

  return (
    <div>
      <section className="relative bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <p className="text-sm uppercase tracking-widest text-neutral-400">adidas Vietnam</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-black uppercase leading-tight md:text-6xl">
            Impossible Is Nothing
          </h1>
          <p className="mt-4 max-w-xl text-neutral-300">
            Khám phá bộ sưu tập giày, quần áo thể thao chính hãng — rebuild từ dự án PHP 2018.
          </p>
          <Link
            href="/vn"
            className="mt-8 inline-block bg-white px-8 py-3 text-sm font-bold uppercase text-black hover:bg-neutral-200"
          >
            Mua sắm ngay
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold uppercase">Nổi bật</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-neutral-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold uppercase">Hàng mới về</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-xl font-bold">Đăng ký nhận tin</h2>
        <p className="mt-2 text-neutral-600">Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt.</p>
        <Link href="/vn/register" className="mt-4 inline-block font-semibold underline">
          Đăng ký miễn phí
        </Link>
      </section>
    </div>
  );
}
