import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { LegacyMenu } from "@/components/legacy/LegacyMenu";
import { LegacyFooter } from "@/components/legacy/LegacyFooter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trang Web Chính Thức adidas | adidas VN",
  description: "Chào mừng bạn đến với adidas Shop cho giày adidas, quần áo và xem bộ sưu tập mới.",
};

const LEGACY_CSS = [
  "/css/foundation.css",
  "/css/menu.css",
  "/css/animatedSearchBar.css",
  "/css/wallpaperWrapper.css",
  "/css/slidenav.css",
  "/css/text-center.css",
  "/css/login/login.css",
  "/css/container.css",
  "/css/footerBottom.css",
  "/css/footer.css",
  "/css/product/products.css",
  "/css/product/product.css",
  "/css/calloutbar.css",
  "/css/cartshow/cartshow.css",
  "/css/search/search.css",
  "/css/register/register.css",
  "/css/build-COMMON/profile.css",
  "/css/legacy-fixes.css",
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="theme-adidas">
      <head>
        {LEGACY_CSS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <link rel="icon" href="/img/adidas-favicon.ico" />
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <LegacyMenu />
        <div id="topdivvv" />
        {children}
        <LegacyFooter />
        <Script src="/js/include.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
