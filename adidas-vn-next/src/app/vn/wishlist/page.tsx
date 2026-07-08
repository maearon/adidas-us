import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { ProductCard } from "@/components/commerce/ProductCard";
import { buttonClass } from "@/components/ui/Button";

export default async function WishlistPage() {
  const session = await getSession();
  if (!session) redirect("/vn/login?redirect=/vn/wishlist");

  const items = await prisma.wishlistItem.findMany({
    where: { userEmail: session.email },
    include: { product: true },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold uppercase">Danh sách yêu thích</h1>

      {items.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-neutral-600">Chưa có sản phẩm yêu thích.</p>
          <Link href="/vn" className={buttonClass("primary", "md") + " mt-6 inline-flex"}>
            Khám phá sản phẩm
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {items.map((item) => (
            <ProductCard key={item.id} product={item.product} />
          ))}
        </div>
      )}
    </div>
  );
}
