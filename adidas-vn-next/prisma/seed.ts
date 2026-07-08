import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";
import { PRODUCTS } from "./products-data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  await prisma.comment.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  for (const p of PRODUCTS) {
    await prisma.product.create({
      data: {
        id: p.id,
        name: p.name.trim(),
        releaseDate: p.releaseDate ? new Date(p.releaseDate) : null,
        image: p.image,
        imageHover: p.imageHover,
        imageDetail: p.imageDetail,
        gender: p.gender,
        age: p.age,
        priceUsd: p.priceUsd,
        originalPriceUsd: p.originalPriceUsd && p.originalPriceUsd > 0 ? p.originalPriceUsd : null,
        onSale: p.onSale,
        color: p.color,
        colorDetail: p.colorDetail,
        franchise: p.franchise,
        productType: p.productType,
        brand: p.brand,
        category: p.category,
        sports: p.sports,
        miAdidas: p.miAdidas,
        teamName: p.teamName,
        partner: p.partner,
      },
    });
  }

  const demoPassword = await bcrypt.hash("demo123456", 10);

  await prisma.user.create({
    data: {
      email: "manh11117@gmail.com",
      passwordHash: await bcrypt.hash("Ndm0915827298", 10),
      name: "Mạnh",
      lastname: "Nguyễn",
      addressName: "Nhà Riêng",
      street: "TL317",
      addressType: "Nhà Nghỉ",
      city: "Hòa Bình",
      state: "Hòa Bình",
      zipcode: "350000",
      country: "Việt Nam",
      phone: "0904272299",
    },
  });

  await prisma.user.create({
    data: {
      email: "dungqr@gmail.com",
      passwordHash: await bcrypt.hash("Ntd0915919303", 10),
      name: "Dũng",
      lastname: "Nguyễn",
    },
  });

  await prisma.user.create({
    data: {
      email: "demo@adidas.vn",
      passwordHash: demoPassword,
      name: "Demo",
      lastname: "User",
    },
  });

  await prisma.cartItem.createMany({
    data: [
      { productId: 12, userEmail: "manh11117@gmail.com" },
      { productId: 7, userEmail: "manh11117@gmail.com" },
    ],
  });

  await prisma.wishlistItem.createMany({
    data: [
      { productId: 2, userEmail: "dungqr@gmail.com" },
      { productId: 12, userEmail: "manh11117@gmail.com" },
      { productId: 93, userEmail: "manh11117@gmail.com" },
    ],
  });

  await prisma.comment.createMany({
    data: [
      { productId: 3, author: "Nguyễn Văn A", body: "Giày chạy rất êm, đúng chất Ultraboost!", date: new Date("2018-06-01") },
      { productId: 3, author: "Trần Thị B", body: "Giao hàng nhanh, size chuẩn.", date: new Date("2018-07-15") },
      { productId: 16, author: "Lê Minh C", body: "Đang sale giá tốt, recommend!", date: new Date("2018-08-01") },
      { productId: 50, author: "Phạm Thu D", body: "Màu đẹp, form nữ vừa vặn.", date: new Date("2018-08-10") },
      { productId: 93, author: "Hoàng E", body: "Tubular Shadow classic, rất ưng!", date: new Date("2018-08-20") },
    ],
  });

  console.log(`Seeded ${PRODUCTS.length} products, 3 users, cart, wishlist, comments.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
