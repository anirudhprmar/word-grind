import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: (() => {
      if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set in environment variables");
      return env.DATABASE_URL;
    })(),
  },
  tablesFilter: ["word-grind_*"],
} satisfies Config;
