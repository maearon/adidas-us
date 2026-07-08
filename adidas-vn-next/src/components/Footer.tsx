import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto bg-neutral-100 text-sm">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="mb-3 font-bold uppercase">Sản phẩm</h3>
          <ul className="space-y-2 text-neutral-600">
            <li><Link href="/vn?men-shoes" className="hover:underline">Giày Nam</Link></li>
            <li><Link href="/vn?women-shoes" className="hover:underline">Giày Nữ</Link></li>
            <li><Link href="/vn?kids" className="hover:underline">Trẻ em</Link></li>
            <li><Link href="/vn?sale" className="hover:underline">Sale</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold uppercase">Hỗ trợ</h3>
          <ul className="space-y-2 text-neutral-600">
            <li><Link href="#" className="hover:underline">Trợ giúp</Link></li>
            <li><Link href="#" className="hover:underline">Theo dõi đơn hàng</Link></li>
            <li><Link href="/vn/login/forgot" className="hover:underline">Quên mật khẩu</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold uppercase">Công ty</h3>
          <ul className="space-y-2 text-neutral-600">
            <li><Link href="#" className="hover:underline">Về adidas</Link></li>
            <li><Link href="/sitemap" className="hover:underline">Sitemap</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold uppercase">Đăng ký</h3>
          <p className="text-neutral-600">Nhận ưu đãi và tin tức mới nhất từ adidas Vietnam.</p>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-500">
        © 2018 adidas Vietnam Inc. — Rebuilt with Next.js + Prisma 7
      </div>
    </footer>
  );
}
