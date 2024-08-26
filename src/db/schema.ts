import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const itemSchema = sqliteTable("item", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  data: text("data", {
    mode: "json",
  }).$type<Record<string, string>>(),
});

export const messageSchema = sqliteTable("message", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  message: text("message").notNull(),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});
