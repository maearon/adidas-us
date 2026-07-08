# adidas VN — Next.js + Prisma 7

Rewrite của dự án PHP/MySQL 2018 (`htdocs`) lên **Next.js 16**, **Prisma 7**, **PostgreSQL (Neon)**.

## Tính năng (tương ứng app cũ)

| Trang cũ | Trang mới |
|---|---|
| `/index.php` | `/` |
| `/vn/index.php` | `/vn` (filter: `?men-running-shoes`) |
| `/vn/product/?slot=` | `/vn/product?slot=` |
| `/vn/cart/` | `/vn/cart` |
| `/vn/wishlist/` | `/vn/wishlist` |
| `/vn/search/` | `/vn/search?q=` |
| `/vn/login/` | `/vn/login` |
| `/vn/register/` | `/vn/register` |
| `/vn/login/profile.php` | `/vn/login/profile` |
| `/vn/login/address.php` | `/vn/login/address` |
| `/vn/login/forgot` | `/vn/login/forgot` |
| `/vn/resetpassword/` | `/vn/resetpassword?token=` |
| `sitemap.html` | `/sitemap` |

## Seed data

- **94 sản phẩm** từ `adidas.sql`
- **3 users**: `demo@adidas.vn` / `demo123456`, + 2 user gốc (hash bcrypt)
- Cart, wishlist, comments mẫu

## Deploy Vercel + Neon

### Vercel project settings

Nếu repo là monorepo (`adidas-us`), đặt **Root Directory** = `adidas-vn-next`.

### Environment Variables (bắt buộc cho runtime)

| Biến | Khi nào cần |
|---|---|
| `DATABASE_URL` | Runtime — Neon connection string |
| `SESSION_SECRET` | Runtime — chuỗi random 32+ ký tự |
| `NEXT_PUBLIC_APP_URL` | Runtime — `https://your-app.vercel.app` |

> `DATABASE_URL` **không** bắt buộc lúc `prisma generate` (build). Nhưng **phải có** trên Vercel để app chạy được sau khi deploy.

1. Vào [neon.tech](https://neon.tech) → tạo project PostgreSQL
2. Copy connection string

### 2. Deploy lên Vercel

```bash
cd adidas-vn-next
npx vercel
```

### 3. Environment Variables (Vercel Dashboard)

| Biến | Giá trị |
|---|---|
| `DATABASE_URL` | `postgresql://...@...neon.tech/neondb?sslmode=require` |
| `SESSION_SECRET` | Chuỗi random 32+ ký tự | 
powershell -Command "[guid]::NewGuid().ToString('N')" "dev-secret-change-in-production-32chars" 
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` |

### 4. Seed database (sau deploy lần đầu)

Chạy local với `DATABASE_URL` trỏ Neon:

```bash
cp .env.example .env
# Sửa DATABASE_URL và SESSION_SECRET trong .env

npm run db:setup
```

Hoặc trên Vercel: thêm script build/postdeploy hoặc chạy `npx prisma db push && npx prisma db seed` từ máy local.

## Dev local

```bash
npm install
cp .env.example .env
# Điền DATABASE_URL (Neon hoặc local Postgres)

npm run db:setup
npm run dev
```

Mở http://localhost:3000

## Stack

- Next.js 16 (App Router)
- Prisma ORM 7 + `@prisma/adapter-pg`
- PostgreSQL (Neon)
- Tailwind CSS 4
- Session JWT (jose) + bcrypt

## Lưu ý

- Ảnh sản phẩm dùng placeholder (picsum) vì repo gốc thiếu `/images/`
- Checkout chỉ demo UI (giống app PHP cũ không có thanh toán thật)
- Password đã hash bcrypt (không còn plaintext như PHP cũ)
