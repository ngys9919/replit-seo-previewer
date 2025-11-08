import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { voteSubmissionSchema } from "@shared/schema";
import { calculateNewRatings } from "./elo";
import { nationalParksData } from "./seed-data";

export function registerRoutes(app: Express): Server {
  // Seed parks on startup
  storage.seedParks(nationalParksData).catch(console.error);

  // Get a random matchup of two parks
  app.get("/api/matchup", async (req, res) => {
    try {
      const matchup = await storage.getRandomMatchup();
      
      if (!matchup) {
        return res.status(404).json({ error: "Not enough parks available" });
      }
      
      res.json(matchup);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Submit a vote
  app.post("/api/vote", async (req, res) => {
    try {
      const voteData = voteSubmissionSchema.parse(req.body);
      
      // Get the current parks
      const winner = await storage.getParkById(voteData.winnerId);
      const loser = await storage.getParkById(voteData.loserId);
      
      if (!winner || !loser) {
        return res.status(404).json({ error: "Park not found" });
      }
      
      // Calculate new ELO ratings
      const { newWinnerRating, newLoserRating } = calculateNewRatings(
        winner.eloRating,
        loser.eloRating
      );
      
      // Record the vote and update ratings in a transaction
      const vote = await storage.recordVoteWithRatings(
        voteData.winnerId,
        voteData.loserId,
        newWinnerRating,
        newLoserRating
      );
      
      res.json({
        vote,
        newWinnerRating,
        newLoserRating,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get rankings (all parks sorted by ELO rating)
  app.get("/api/rankings", async (req, res) => {
    try {
      const parks = await storage.getAllParks();
      res.json(parks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get recent votes
  app.get("/api/recent-votes", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const recentVotes = await storage.getRecentVotes(limit);
      res.json(recentVotes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
