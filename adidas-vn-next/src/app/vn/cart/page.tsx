import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { formatVnd, productImageUrl } from "@/lib/format";
import { RemoveCartButton } from "@/components/CommerceButtons";
import { buttonClass } from "@/components/ui/Button";

export default async function CartPage() {
  const session = await getSession();
  if (!session) redirect("/vn/login?redirect=/vn/cart");

  const items = await prisma.cartItem.findMany({
    where: { userEmail: session.email },
    include: { product: true },
  });
  const total = items.reduce((sum, i) => sum + i.product.priceUsd, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold uppercase">Giỏ hàng</h1>

      {items.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-neutral-600">Giỏ hàng trống.</p>
          <Link href="/vn" className={buttonClass("primary", "md") + " mt-6 inline-flex"}>
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-neutral-200 pb-4">
                <div className="relative h-24 w-24 shrink-0 bg-neutral-100">
                  <Image src={productImageUrl(item.product.id, item.product.image)} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <Link href={`/vn/product?slot=${item.product.id}`} className="font-semibold hover:underline">
                    {item.product.name}
                  </Link>
                  <p className="mt-1 font-semibold">{formatVnd(item.product.priceUsd)}</p>
                  <RemoveCartButton itemId={item.id} />
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit border border-neutral-200 p-6">
            <h2 className="font-bold uppercase">Tóm tắt</h2>
            <div className="mt-4 flex justify-between text-sm">
              <span>Tổng ({items.length} SP)</span>
              <span className="font-bold">{formatVnd(total)}</span>
            </div>
            <button type="button" className={buttonClass("primary", "md") + " mt-6 w-full"}>
              Thanh toán (demo)
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
