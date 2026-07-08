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
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-2 text-2xl font-bold uppercase">Tài khoản của tôi</h1>
      <p className="mb-8 text-neutral-600">Chào mừng trở lại, {user.name} {user.lastname}</p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="border p-6">
          <h2 className="font-bold uppercase">Thông tin cá nhân</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div><dt className="font-semibold">Email</dt><dd>{user.email}</dd></div>
            <div><dt className="font-semibold">Họ tên</dt><dd>{user.name} {user.lastname}</dd></div>
            <div><dt className="font-semibold">Điện thoại</dt><dd>{user.phone || "—"}</dd></div>
          </dl>
        </div>
        <div className="border p-6">
          <h2 className="font-bold uppercase">Địa chỉ</h2>
          {user.street ? (
            <p className="mt-4 text-sm">
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

      <div className="mt-8 flex gap-4">
        <Link href="/vn/wishlist" className="underline">Danh sách yêu thích</Link>
        <Link href="/vn/cart" className="underline">Giỏ hàng</Link>
        <LogoutButton />
      </div>
    </div>
  );
}
