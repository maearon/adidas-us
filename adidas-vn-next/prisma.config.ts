import "dotenv/config";
import { defineConfig } from "prisma/config";

// prisma generate does not connect to the DB — a placeholder URL is enough at build time.
// Runtime (migrate/seed/app) still requires a real DATABASE_URL.
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://build:build@127.0.0.1:5432/build?schema=public";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
