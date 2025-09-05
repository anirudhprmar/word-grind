// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `wordgrind_${name}`);


export const user = createTable(
  "user",
  (d) => ({
    id: d.text("id").primaryKey(),
     name: d.text("name").notNull(),
     email: d.text("email").notNull().unique(),
     emailVerified: d.boolean("email_verified")
       .$defaultFn(() => false)
       .notNull(),
     image: d.text("image"),
     createdAt: d.timestamp("created_at")
       .$defaultFn(() => new Date())
       .notNull(),
     updatedAt: d.timestamp("updated_at")
       .$defaultFn(() => new Date())
       .notNull(),
    role: d.text("role"),
    banned: d.boolean("banned"),
    banReason: d.text("ban_reason"),
    banExpires: d.timestamp("ban_expires"),
  }),
  (t) => [index("email_idx").on(t.email)],
) 


export const words = createTable(
  "words",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    userId:d.text().notNull().references(()=> user.id),
    name: d.varchar({ length: 256 }).notNull().unique(),
    meaning: d.varchar({ length: 256 }).notNull(),
    pronunciation: d.varchar({ length: 256 }),
    example: d.varchar({ length: 256 }).array(),
    synonyms: d.varchar({ length: 64 }).array(), 
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    learned: d.boolean().default(false).notNull(),
  }),
  (t) => [index("word_idx").on(t.name)],
)

//change quiz id to text just like user table

export const quizzes = createTable(
  "quizzes",
  (d)=>({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    userId: d.text().notNull().references(() => user.id),
    wordId: d.integer().notNull().references(() => words.id),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
      completedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
      result: d.text({enum:["success","failure","null"]}).default("null"),
      feedback:d.text().default("").notNull(),
      suggestion:d.text().default("").notNull(),
      score:d.integer().default(0).notNull(),
      totalQuestions: d.integer().default(0).notNull()
  }),
  (t)=> [index("quizzes_idx").on(t.userId, t.wordId)]
)

export const quizResponse = createTable(
  "quiz_responses",
  (d)=>({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    quizId: d.integer().notNull().references(() => quizzes.id),
    question: d.text().notNull(),
    choices:d.text().array().notNull(),
    userAnswer: d.text().notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    isCorrect:d.boolean().notNull()
  }),
  (t)=> [index("quiz_responses_quiz_idx").on(t.quizId)]
)



export const session = createTable("session", (d)=>({
  id: d.text("id").primaryKey(),
  expiresAt: d.timestamp("expires_at").notNull(),
  token: d.text("token").notNull().unique(),
  createdAt: d.timestamp("created_at").notNull(),
  updatedAt: d.timestamp("updated_at").notNull(),
  ipAddress: d.text("ip_address"),
  userAgent: d.text("user_agent"),
  userId: d.text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: d.text("impersonated_by"),
}));

export const account = createTable("account", (d)=>({
  id: d.text("id").primaryKey(),
  accountId: d.text("account_id").notNull(),
  providerId: d.text("provider_id").notNull(),
  userId: d.text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: d.text("access_token"),
  refreshToken: d.text("refresh_token"),
  idToken: d.text("id_token"),
  accessTokenExpiresAt: d.timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: d.timestamp("refresh_token_expires_at"),
  scope: d.text("scope"),
  password: d.text("password"),
  createdAt: d.timestamp("created_at").notNull(), 
  updatedAt: d.timestamp("updated_at").notNull(),
}));

export const verification = createTable("verification", (d)=>({
  id: d.text("id").primaryKey(),
  identifier: d.text("identifier").notNull(),
  value: d.text("value").notNull(),
  expiresAt: d.timestamp("expires_at").notNull(),
  createdAt: d.timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: d.timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
}));
