import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/vn/login");

  const user = await prisma.user.findUnique({ where: { email: session.email } });
  if (!user) redirect("/vn/login");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold uppercase">Tài khoản của tôi</h1>
      <p className="mt-2 text-neutral-600">Chào mừng trở lại, {user.name} {user.lastname}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="border border-neutral-200 p-6">
          <h2 className="text-sm font-bold uppercase tracking-wide">Thông tin</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="font-medium text-neutral-500">Email</dt><dd>{user.email}</dd></div>
            <div><dt className="font-medium text-neutral-500">Họ tên</dt><dd>{user.name} {user.lastname}</dd></div>
            <div><dt className="font-medium text-neutral-500">Điện thoại</dt><dd>{user.phone || "—"}</dd></div>
          </dl>
        </div>
        <div className="border border-neutral-200 p-6">
          <h2 className="text-sm font-bold uppercase tracking-wide">Địa chỉ</h2>
          {user.street ? (
            <p className="mt-4 text-sm leading-relaxed">
              {user.addressName}<br />
              {user.street}, {user.city}<br />
              {user.state} {user.zipcode}, {user.country}
            </p>
          ) : (
            <p className="mt-4 text-sm text-neutral-500">Chưa có địa chỉ.</p>
          )}
          <Link href="/vn/login/address" className="mt-4 inline-block text-sm underline">Cập nhật địa chỉ</Link>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link href="/vn/wishlist" className="underline">Yêu thích</Link>
        <Link href="/vn/cart" className="underline">Giỏ hàng</Link>
        <LogoutButton />
      </div>
    </div>
  );
}
