export type NavLink = { label: string; href: string; highlight?: boolean };

export type NavColumn = { title: string; links: NavLink[] };

export type NavSection = {
  id: string;
  label: string;
  href: string;
  columns: NavColumn[];
};

export const MAIN_NAV: NavSection[] = [
  {
    id: "men",
    label: "NAM",
    href: "/vn?men",
    columns: [
      {
        title: "NỔI BẬT",
        links: [
          { label: "Hàng Mới Về", href: "/vn?men-new_arrivals" },
          { label: "Bán Chạy Nhất", href: "/vn?men-best-seller" },
          { label: "GIẢM GIÁ", href: "/vn?men-sale", highlight: true },
          { label: "P.O.D.System", href: "/vn?men-podsystem" },
          { label: "Ultraboost", href: "/vn?men-ultraboost" },
          { label: "adicolor", href: "/vn?men-adicolor" },
        ],
      },
      {
        title: "GIÀY",
        links: [
          { label: "Chạy Bộ", href: "/vn?men-running-shoes" },
          { label: "Bóng Đá", href: "/vn?men-soccer-shoes" },
          { label: "Bóng Rổ", href: "/vn?men-basketball-shoes" },
          { label: "Luyện Tập", href: "/vn?men-training-shoes" },
          { label: "Dép Lê", href: "/vn?men-slides" },
        ],
      },
      {
        title: "QUẦN ÁO",
        links: [
          { label: "Hoodies", href: "/vn?men-hoodies_sweatshirts" },
          { label: "Áo Khoác", href: "/vn?men-jackets" },
          { label: "Quần Dài", href: "/vn?men-pants" },
          { label: "Shorts", href: "/vn?men-shorts" },
        ],
      },
      {
        title: "MÔN",
        links: [
          { label: "Chạy", href: "/vn?men-running" },
          { label: "Bóng Đá", href: "/vn?men-soccer" },
          { label: "Bóng Rổ", href: "/vn?men-basketball" },
          { label: "Golf", href: "/vn?men-golf" },
        ],
      },
    ],
  },
  {
    id: "women",
    label: "NỮ",
    href: "/vn?women",
    columns: [
      {
        title: "NỔI BẬT",
        links: [
          { label: "Hàng Mới Về", href: "/vn?women-new-arrivals" },
          { label: "GIẢM GIÁ", href: "/vn?women-sale", highlight: true },
          { label: "Ultraboost", href: "/vn?women-ultraboost" },
          { label: "Tubular", href: "/vn?women-tubular" },
        ],
      },
      {
        title: "GIÀY",
        links: [
          { label: "Chạy Bộ", href: "/vn?women-running-shoes" },
          { label: "Luyện Tập", href: "/vn?women-training-shoes" },
          { label: "Dép Lê", href: "/vn?women-slides" },
        ],
      },
      {
        title: "QUẦN ÁO",
        links: [
          { label: "Leggings", href: "/vn?women-tights" },
          { label: "Hoodies", href: "/vn?women-hoodies_sweatshirts" },
          { label: "Váy", href: "/vn?women-dresses_and_skirts" },
        ],
      },
    ],
  },
  {
    id: "kids",
    label: "TRẺ EM",
    href: "/vn?kids",
    columns: [
      {
        title: "NỔI BẬT",
        links: [
          { label: "Hàng Mới Về", href: "/vn?kids-new-arrivals" },
          { label: "GIẢM GIÁ", href: "/vn?kids-sale", highlight: true },
          { label: "Ultraboost", href: "/vn?kids-ultraboost" },
        ],
      },
      {
        title: "THEO ĐỘ TUỔI",
        links: [
          { label: "Trẻ (8-14)", href: "/vn?kids-youth" },
          { label: "Trẻ Em (4-8)", href: "/vn?kids-children" },
          { label: "Sơ Sinh", href: "/vn?kids-infant_toddler" },
        ],
      },
    ],
  },
];

export const SALE_LINK = { label: "SALE", href: "/vn?sale" };
