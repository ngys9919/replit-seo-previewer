import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// National Parks table
export const parks = pgTable("parks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  eloRating: integer("elo_rating").notNull().default(1500),
});

export const insertParkSchema = createInsertSchema(parks).omit({
  id: true,
});

export type InsertPark = z.infer<typeof insertParkSchema>;
export type Park = typeof parks.$inferSelect;

// Votes table
export const votes = pgTable("votes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  winnerId: varchar("winner_id").notNull().references(() => parks.id),
  loserId: varchar("loser_id").notNull().references(() => parks.id),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertVoteSchema = createInsertSchema(votes).omit({
  id: true,
  timestamp: true,
});

export type InsertVote = z.infer<typeof insertVoteSchema>;
export type Vote = typeof votes.$inferSelect;

// Vote submission schema (for API)
export const voteSubmissionSchema = z.object({
  winnerId: z.string(),
  loserId: z.string(),
});

export type VoteSubmission = z.infer<typeof voteSubmissionSchema>;

// Matchup response type
export const matchupSchema = z.object({
  park1: z.object({
    id: z.string(),
    name: z.string(),
    location: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    eloRating: z.number(),
  }),
  park2: z.object({
    id: z.string(),
    name: z.string(),
    location: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    eloRating: z.number(),
  }),
});

export type Matchup = z.infer<typeof matchupSchema>;
