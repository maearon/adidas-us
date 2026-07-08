import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Hỗ trợ khách hàng",
    links: ["Giúp", "Theo dõi đơn hàng", "Trả lại & hoàn phí", "Định cỡ", "Sitemap"],
  },
  {
    title: "Thông tin công ty",
    links: ["Về adidas", "Nghề nghiệp", "Bền vững", "Đại lý"],
  },
  {
    title: "Riêng tư & điều khoản",
    links: ["Chính sách bảo mật", "Điều khoản sử dụng"],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-neutral-100 text-sm text-neutral-800">
      <div className="border-b border-neutral-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-lg font-semibold uppercase tracking-wide">
            Đăng ký để nhận tin tức & được <span className="text-red-600">giảm 15%</span>
          </p>
          <Link href="/vn/register" className="mt-4 inline-block bg-black px-8 py-3 text-xs font-bold uppercase text-white hover:bg-neutral-800">
            Đăng ký miễn phí
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider">{col.title}</h3>
            <ul className="space-y-2 text-neutral-600">
              {col.links.map((label) => (
                <li key={label}>
                  <Link href="#" className="hover:underline">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider">Mua sắm</h3>
          <ul className="space-y-2 text-neutral-600">
            <li><Link href="/vn?men-shoes" className="hover:underline">Giày nam</Link></li>
            <li><Link href="/vn?women-shoes" className="hover:underline">Giày nữ</Link></li>
            <li><Link href="/vn?kids" className="hover:underline">Trẻ em</Link></li>
            <li><Link href="/vn?sale" className="hover:underline">Sale</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-500">
        © 2018 adidas Vietnam Inc. — Rebuilt with Next.js + Tailwind
      </div>
    </footer>
  );
}
