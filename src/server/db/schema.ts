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
    isAdmin:d.boolean("isAdmin").default(false).notNull()
  }),
  (t) => [index("email_idx").on(t.email)],
) 


export const words = createTable(
  "words",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }).notNull().unique(),
    meaning: d.varchar({ length: 256 }).notNull(),
    example: d.varchar({ length: 256 }),
    pronunciation: d.varchar({ length: 256 }),
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


export const quizzes = createTable(
  "quizzes",
  (d)=>({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    userId: d.text().notNull().references(() => users.id),
    wordId: d.integer().notNull().references(() => words.id),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    completedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    result: d.text({enum:["success","failure"]}),
    feedback:d.text().notNull(),
    suggestion:d.text().notNull()
  }),
  (t)=> [index("user_tests_idx").on(t.userId, t.wordId)]
)



