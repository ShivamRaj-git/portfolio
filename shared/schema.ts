import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
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

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  message: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  longDescription: z.string(),
  image: z.string(),
  technologies: z.array(z.string()),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  category: z.string(),
});

export type Project = z.infer<typeof projectSchema>;

export const skillSchema = z.object({
  name: z.string(),
  icon: z.string(),
  category: z.enum(["frontend", "backend", "tools", "design"]),
  level: z.number().min(0).max(100),
});

export type Skill = z.infer<typeof skillSchema>;

export const timelineItemSchema = z.object({
  id: z.string(),
  year: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  type: z.enum(["education", "experience"]),
});

export type TimelineItem = z.infer<typeof timelineItemSchema>;

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
