import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { formatVnd, productImageUrl } from "@/lib/format";
import { RemoveCartButton } from "@/components/CommerceButtons";

export default async function CartPage() {
  const session = await getSession();
  if (!session) redirect("/vn/login?redirect=/vn/cart");

  const items = await prisma.cartItem.findMany({
    where: { userEmail: session.email },
    include: { product: true },
  });

  const total = items.reduce((sum, i) => sum + i.product.priceUsd, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold uppercase">Giỏ hàng</h1>

      {items.length === 0 ? (
        <div className="text-center">
          <p className="text-neutral-500">Giỏ hàng trống.</p>
          <Link href="/vn" className="mt-4 inline-block underline">Tiếp tục mua sắm</Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <div className="relative h-24 w-24 shrink-0 bg-neutral-100">
                  <Image src={productImageUrl(item.product.id)} alt={item.product.name} fill className="object-cover" />
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
          <div className="border p-6">
            <h2 className="font-bold uppercase">Tóm tắt</h2>
            <div className="mt-4 flex justify-between">
              <span>Tổng ({items.length} sản phẩm)</span>
              <span className="font-bold">{formatVnd(total)}</span>
            </div>
            <button className="mt-6 w-full bg-black py-3 text-sm font-semibold uppercase text-white">
              Thanh toán (demo)
            </button>
            <p className="mt-2 text-xs text-neutral-500">Checkout chưa tích hợp — giống app PHP cũ.</p>
          </div>
        </div>
      )}
    </div>
  );
}
