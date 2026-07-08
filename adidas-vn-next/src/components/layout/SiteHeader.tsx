"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MAIN_NAV, SALE_LINK } from "@/lib/navigation";
import { cn } from "@/lib/cn";

type Props = {
  session: { email: string; name: string } | null;
  wishlistCount: number;
};

export function SiteHeaderClient({ session, wishlistCount }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const cartHref = session ? "/vn/cart" : "/vn/login";
  const wishHref = session ? "/vn/wishlist" : "/vn/login";

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-md">
      {/* Utility bar */}
      <div className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-end gap-x-4 gap-y-1 px-4 py-2 text-[10px] uppercase tracking-wide text-neutral-300 sm:text-[11px]">
          <Link href="#" className="hover:text-white">Giúp</Link>
          <Link href="#" className="hover:text-white">Theo dõi đơn hàng</Link>
          {!session ? (
            <>
              <Link href="/vn/register" className="font-semibold text-white hover:underline">Đăng ký</Link>
              <Link href="/vn/login" className="hover:text-white">Đăng nhập</Link>
            </>
          ) : (
            <>
              <Link href="/vn/login/profile" className="hover:text-white">Tài khoản</Link>
              <Link href="/vn/wishlist" className="hover:text-white">Yêu thích ({wishlistCount})</Link>
              <span className="text-white">Chào {session.name}</span>
            </>
          )}
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="shrink-0">
          <Image src="/img/logo.png" alt="adidas" width={56} height={36} className="h-8 w-auto invert" priority />
        </Link>

        <nav className="hidden flex-1 items-center gap-6 lg:flex">
          {MAIN_NAV.map((section) => (
            <div key={section.id} className="group relative">
              <Link
                href={section.href}
                className="text-sm font-semibold uppercase tracking-wide hover:underline"
              >
                {section.label}
              </Link>
              <div className="invisible absolute left-0 top-full z-50 w-[min(90vw,720px)] border border-neutral-200 bg-white p-6 text-black opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  {section.columns.map((col) => (
                    <div key={col.title}>
                      <p className="mb-2 text-xs font-bold uppercase text-neutral-500">{col.title}</p>
                      <ul className="space-y-1.5">
                        {col.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className={cn(
                                "text-sm hover:underline",
                                link.highlight && "font-bold text-red-600",
                              )}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <Link href={SALE_LINK.href} className="text-sm font-semibold uppercase text-red-400 hover:underline">
            {SALE_LINK.label}
          </Link>
        </nav>

        <form action="/vn/search" method="get" className="hidden md:block md:flex-1 md:max-w-xs">
          <input
            name="q"
            placeholder="Tìm kiếm..."
            className="w-full border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-3">
          <Link href={wishHref} className="relative p-1 hover:opacity-80" aria-label="Yêu thích">
            <Image src="/img/wish.png" alt="" width={22} height={22} className="invert" />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href={cartHref} className="p-1 hover:opacity-80" aria-label="Giỏ hàng">
            <Image src="/img/bag.png" alt="" width={22} height={22} className="invert" />
          </Link>
          <button
            type="button"
            className="p-2 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className="block h-0.5 w-5 bg-white" />
            <span className="mt-1 block h-0.5 w-5 bg-white" />
            <span className="mt-1 block h-0.5 w-5 bg-white" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-black px-4 py-4 lg:hidden">
          <form action="/vn/search" method="get" className="mb-4">
            <input
              name="q"
              placeholder="Tìm kiếm..."
              className="w-full border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm text-white"
            />
          </form>
          {MAIN_NAV.map((section) => (
            <div key={section.id} className="border-b border-white/10 py-2">
              <button
                type="button"
                className="flex w-full items-center justify-between py-2 text-sm font-semibold uppercase"
                onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              >
                {section.label}
                <span>{openSection === section.id ? "−" : "+"}</span>
              </button>
              {openSection === section.id && (
                <div className="pb-3 pl-2">
                  {section.columns.flatMap((c) => c.links).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-1.5 text-sm text-neutral-300 hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href={SALE_LINK.href} className="mt-2 block py-2 text-sm font-bold uppercase text-red-400">
            {SALE_LINK.label}
          </Link>
        </div>
      )}
    </header>
  );
}
