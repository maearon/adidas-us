import { prisma } from "@/lib/prisma";
import { HeroBanner, TeaserGrid } from "@/components/commerce/HeroBanner";
import { ProductCard } from "@/components/commerce/ProductCard";

export default async function HomePage() {
  const [featured, newArrivals] = await Promise.all([
    prisma.product.findMany({
      where: { OR: [{ franchise: "ultraboost" }, { franchise: "nmd" }, { onSale: "sale" }] },
      take: 8,
      orderBy: { id: "asc" },
    }),
    prisma.product.findMany({ take: 4, orderBy: { releaseDate: "desc" } }),
  ]);

  return (
    <>
      <HeroBanner
        image="/lib/1.jpg"
        title="P.O.D.SYSTEM"
        summary="Một cấu trúc vỏ giày mới kết hợp ba công nghệ di sản trong một."
        primaryCta={{ label: "Shop Nam", href: "/vn?men-podsystem" }}
        secondaryCta={{ label: "Shop Nữ", href: "/vn?women-podsystem" }}
      />

      <TeaserGrid
        items={[
          { image: "/lib/2.jpg", title: "P.O.D.SYSTEM", cta: "Mua ngay", href: "/vn?podsystem" },
          { image: "/lib/3.jpg", title: "Hình dung lại di sản", cta: "Mua ngay", href: "/vn?originals_podsystem" },
        ]}
      />

      <HeroBanner
        image="/lib/4.jpg"
        title="Áo chùm nỉ Z.N.E."
        summary="Sinh ra trong thể thao. Làm cho cuộc sống. Được tạo bằng công nghệ phát hành nhanh."
        primaryCta={{ label: "Shop Nam", href: "/vn?men-zne" }}
        secondaryCta={{ label: "Shop Nữ", href: "/vn?women-zne" }}
      />

      <TeaserGrid
        items={[
          { image: "/lib/5.jpg", title: "adidas by Stella McCartney", cta: "Mua ngay", href: "/vn?adidas_by_stella_mccartney" },
          { image: "/lib/6.jpg", title: "Trở lại với thể thao", cta: "Mua ngay", href: "/vn?back-to-sport" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-xl font-bold uppercase tracking-wide">Nổi bật</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-6 text-xl font-bold uppercase tracking-wide">Hàng mới về</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
