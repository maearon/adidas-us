import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeaderWrapper";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ChatbotFab } from "@/components/layout/ChatbotFab";

export const dynamic = "force-dynamic";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trang Web Chính Thức adidas | adidas VN",
  description: "Chào mừng bạn đến với adidas Shop cho giày adidas, quần áo và xem bộ sưu tập mới.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/img/adidas-favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <ChatbotFab />
      </body>
    </html>
  );
}
