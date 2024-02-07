import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Define Table Schema
export const userTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey().notNull(),
    email: text("email").notNull().unique("email_unique"),
    username: text("username").notNull().unique("username_unique"),
    password: text("password").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt"),
  },
  (table) => {
    return {
      emailIdx: index("email_idx").on(table.email),
    };
  }
);
export type UserTable = typeof userTable.$inferInsert;
export type UserTableSafe = Omit<typeof userTable.$inferSelect, "password">;

// Define Insert Schema
export const insertUserSchema = createInsertSchema(userTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertUserSchema = z.infer<typeof insertUserSchema>;

// Define Update Schema
export const updateUserSchema = insertUserSchema.partial().extend({
  id: z.coerce.number().min(1),
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

// Define Select Schema
export const selectUserSchema = createSelectSchema(userTable).omit({
  password: true,
});
export type SelectUserSchema = z.infer<typeof selectUserSchema>;

// Define Dangerous Select Schema
export const dangerousSelectUserSchema = createSelectSchema(userTable);
export type DangerousSelectUserSchema = z.infer<
  typeof dangerousSelectUserSchema
>;
