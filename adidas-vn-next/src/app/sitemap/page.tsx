import Link from "next/link";

const PAGES = [
  { href: "/", label: "Trang chủ" },
  { href: "/vn", label: "Cửa hàng" },
  { href: "/vn?men-shoes", label: "Giày Nam" },
  { href: "/vn?women-shoes", label: "Giày Nữ" },
  { href: "/vn?kids", label: "Trẻ em" },
  { href: "/vn?sale", label: "Sale" },
  { href: "/vn/search", label: "Tìm kiếm" },
  { href: "/vn/cart", label: "Giỏ hàng" },
  { href: "/vn/wishlist", label: "Yêu thích" },
  { href: "/vn/login", label: "Đăng nhập" },
  { href: "/vn/register", label: "Đăng ký" },
  { href: "/vn/login/profile", label: "Tài khoản" },
  { href: "/vn/login/address", label: "Địa chỉ" },
  { href: "/vn/login/forgot", label: "Quên mật khẩu" },
  { href: "/vn/resetpassword", label: "Reset mật khẩu" },
];

export default function SitemapPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-2xl font-bold">Sitemap</h1>
      <p className="mb-8 text-sm text-neutral-500">Cập nhật: {new Date().toLocaleDateString("vi-VN")}</p>
      <ul className="space-y-2">
        {PAGES.map((p) => (
          <li key={p.href}>
            <Link href={p.href} className="text-sm hover:underline">{p.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
