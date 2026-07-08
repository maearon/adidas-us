import Link from "next/link";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { NAV_LINKS } from "@/lib/filters";

export async function Header() {
  const session = await getSession();
  let wishlistCount = 0;
  if (session?.email) {
    wishlistCount = await prisma.wishlistItem.count({ where: { userEmail: session.email } });
  }

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="bg-black text-white text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-4 px-4 py-2">
          {!session ? (
            <>
              <Link href="#" className="hover:underline">Giúp</Link>
              <Link href="#" className="hover:underline">Theo dõi đơn hàng</Link>
              <Link href="/vn/register" className="font-semibold hover:underline">Đăng ký mới</Link>
              <Link href="/vn/login" className="hover:underline">Đăng nhập</Link>
            </>
          ) : (
            <>
              <Link href="/vn/login/profile" className="hover:underline">Tài khoản của tôi</Link>
              <Link href="/vn/wishlist" className="hover:underline">
                Danh sách yêu thích ({wishlistCount})
              </Link>
              <span>Chào mừng trở lại {session.name}</span>
            </>
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight">
          adidas
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <div className="group relative">
            <Link href="/vn?men" className="font-semibold uppercase hover:underline">Nam</Link>
            <div className="absolute left-0 top-full z-50 hidden min-w-[200px] bg-white p-4 shadow-lg group-hover:block">
              {NAV_LINKS.men.map((l) => (
                <Link key={l.href} href={l.href} className="block py-1 text-sm hover:underline">{l.label}</Link>
              ))}
            </div>
          </div>
          <div className="group relative">
            <Link href="/vn?women" className="font-semibold uppercase hover:underline">Nữ</Link>
            <div className="absolute left-0 top-full z-50 hidden min-w-[200px] bg-white p-4 shadow-lg group-hover:block">
              {NAV_LINKS.women.map((l) => (
                <Link key={l.href} href={l.href} className="block py-1 text-sm hover:underline">{l.label}</Link>
              ))}
            </div>
          </div>
          <div className="group relative">
            <Link href="/vn?kids" className="font-semibold uppercase hover:underline">Trẻ em</Link>
            <div className="absolute left-0 top-full z-50 hidden min-w-[200px] bg-white p-4 shadow-lg group-hover:block">
              {NAV_LINKS.kids.map((l) => (
                <Link key={l.href} href={l.href} className="block py-1 text-sm hover:underline">{l.label}</Link>
              ))}
            </div>
          </div>
          <Link href="/vn?sale" className="font-semibold uppercase text-red-600 hover:underline">Sale</Link>
        </nav>

        <div className="flex items-center gap-4">
          <form action="/vn/search" method="get" className="hidden sm:block">
            <input
              name="q"
              placeholder="Tìm kiếm..."
              className="border border-neutral-300 px-3 py-1.5 text-sm focus:border-black focus:outline-none"
            />
          </form>
          <Link href="/vn/wishlist" className="text-sm hover:underline">♥</Link>
          <Link href="/vn/cart" className="text-sm hover:underline">Giỏ hàng</Link>
        </div>
      </div>
    </header>
  );
}
