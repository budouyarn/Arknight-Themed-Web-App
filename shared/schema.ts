import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const tables = pgTable("tables", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  gridX: integer("grid_x").notNull(),
  gridY: integer("grid_y").notNull(),
});

export const guests = pgTable("guests", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  faction: text("faction").notNull(),
  tableId: varchar("table_id").notNull(),
});

export const insertTableSchema = createInsertSchema(tables);
export const insertGuestSchema = createInsertSchema(guests);

export const updateTableSchema = insertTableSchema.partial().omit({ id: true });
export const updateGuestSchema = insertGuestSchema.partial().omit({ id: true });

export type InsertTable = z.infer<typeof insertTableSchema>;
export type Table = typeof tables.$inferSelect;
export type InsertGuest = z.infer<typeof insertGuestSchema>;
export type Guest = typeof guests.$inferSelect;
export type UpdateTable = z.infer<typeof updateTableSchema>;
export type UpdateGuest = z.infer<typeof updateGuestSchema>;

export const factions = [
  "Rhodes Island",
  "Lungmen",
  "Ursus",
  "Victoria",
  "Kazimierz",
  "Laterano",
  "Siesta",
  "Bolivar",
  "Sargon",
  "Yan"
] as const;

export type Faction = typeof factions[number];
