import path from "node:path";
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
   schema: path.join("prisma", "schema.prisma"),
   engine: "classic",
   datasource: {
      url: env("DATABASE_URL"),
   },
});
