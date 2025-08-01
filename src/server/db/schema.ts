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
export const createTable = pgTableCreator((name) => `vocab-grinder_${name}`);


export const users = createTable(
  "users",
  (d) => ({
     id: d.text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.text("name"),
  email: d.text("email").unique(),
  emailVerified: d.timestamp("emailVerified", { mode: "date" }),
  image: d.text("image"),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    isadmin:d.boolean("isadmin").default(false).notNull()
  }),
  (t) => [index("email_idx").on(t.email)],
) // payment info and user progress like words learned and vocab expanded

//meaning, pronunciation, synonyms, example sentences,learned or not
export const words = createTable(
  "words",
  (d) => ({
    id: d.text().primaryKey(),
    word: d.varchar({ length: 256 }).notNull().unique(),
    meaning: d.varchar({ length: 256 }).notNull(),
    example: d.varchar({ length: 256 }),
    pronunciation: d.varchar({ length: 256 }),
    synonyms: d.varchar({ length: 64 }).array(), // <-- now an array of strings
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    learned: d.boolean().default(false).notNull(),
  }),
  (t) => [index("word_idx").on(t.word)],
)



export const quizzes = createTable(
  "quizzes",
  (d)=>({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    userId: d.text().notNull().references(() => users.id),
    wordId: d.text().notNull().references(() => words.id),
    quizType: d.text("quizType").notNull(), // e.g., "multiple-choice", "fill-in-the-blank"
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    completedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date())
  }),
  (t)=> [index("user_tests_idx").on(t.userId, t.wordId)]
)



export const accounts = createTable(
  "accounts",
  (d) => ({
    userId: d.text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: d.text("type").notNull(),
    provider: d.text("provider").notNull(),
    providerAccountId: d.text("providerAccountId").notNull(),
    refresh_token: d.text("refresh_token"),
    access_token: d.text("access_token"),
    expires_at: d.integer("expires_at"),
    token_type: d.text("token_type"),
    scope: d.text("scope"),
    id_token: d.text("id_token"),
    session_state: d.text("session_state"),
  }),
  (account) => [
    index("account.provider_idx").on(account.provider, account.providerAccountId),
  ]
);
 
export const sessions = createTable(
  "sessions",
  (d) => ({
    sessionToken: d.text("sessionToken").primaryKey(),
    userId: d.text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    expires: d.timestamp("expires", { mode: "date" }).notNull(),
  })
);
 
export const verificationTokens = createTable(
  "verification_tokens",
  (d) => ({
    identifier: d.text("identifier").notNull(),
    token: d.text("token").notNull(),
    expires: d.timestamp("expires", { mode: "date" }).notNull(),
  }),
  (vt) => [
    index("verification_token_idx").on(vt.identifier, vt.token),
  ]
);
 
export const authenticators = createTable(
  "authenticators",
  (d) => ({
    credentialID: d.text("credentialID").notNull().unique(),
    userId: d.text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: d.text("providerAccountId").notNull(),
    credentialPublicKey: d.text("credentialPublicKey").notNull(),
    counter: d.integer("counter").notNull(),
    credentialDeviceType: d.text("credentialDeviceType").notNull(),
    credentialBackedUp: d.boolean("credentialBackedUp").notNull(),
    transports: d.text("transports"),
  }),
  (authenticator) => [
    index("authenticators_idx").on(authenticator.userId, authenticator.credentialID),
  ]
);