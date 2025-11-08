import type { Express } from "express";
import { z } from "zod";
import { seoAnalysisRequestSchema, type SEOAnalysis, type MetaTag } from "@shared/schema";
import { load } from "cheerio";

export function registerRoutes(app: Express) {
  // SEO Analysis endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { url } = seoAnalysisRequestSchema.parse(req.body);
      
      // Fetch the webpage
      const response = await fetch(url);
      if (!response.ok) {
        return res.status(400).json({ error: "Failed to fetch URL" });
      }
      
      const html = await response.text();
      const $ = load(html);
      
      // Extract meta tags
      const title = $('title').text() || $('meta[property="og:title"]').attr('content') || '';
      const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';
      
      // Helper function to get meta content
      const getMeta = (selector: string): string | undefined => {
        return $(selector).attr('content');
      };
      
      // Helper to create meta tag object
      const createMetaTag = (
        name: string,
        content: string | undefined,
        optimalMin?: number,
        optimalMax?: number
      ): MetaTag => {
        if (!content) {
          return {
            name,
            content: '',
            status: 'missing',
            recommendation: `Add ${name} to improve SEO`,
          };
        }
        
        const characterCount = content.length;
        
        if (optimalMin && optimalMax) {
          const optimalRange = `${optimalMin}-${optimalMax} characters`;
          if (characterCount >= optimalMin && characterCount <= optimalMax) {
            return {
              name,
              content,
              status: 'optimal',
              characterCount,
              optimalRange,
            };
          } else if (characterCount > 0) {
            return {
              name,
              content,
              status: 'warning',
              characterCount,
              optimalRange,
              recommendation: characterCount < optimalMin 
                ? `Increase length to at least ${optimalMin} characters` 
                : `Reduce length to ${optimalMax} characters or less`,
            };
          }
        }
        
        return {
          name,
          content,
          status: 'present',
          characterCount,
        };
      };
      
      // Essential SEO Tags
      const essentialTags: MetaTag[] = [
        createMetaTag('Title', title, 50, 60),
        createMetaTag('Meta Description', description, 150, 160),
        createMetaTag('Meta Keywords', getMeta('meta[name="keywords"]')),
        createMetaTag('Canonical URL', $('link[rel="canonical"]').attr('href')),
        createMetaTag('Meta Robots', getMeta('meta[name="robots"]')),
      ];
      
      // Open Graph Tags
      const openGraphTags: MetaTag[] = [
        createMetaTag('OG Title', getMeta('meta[property="og:title"]'), 50, 60),
        createMetaTag('OG Description', getMeta('meta[property="og:description"]'), 150, 160),
        createMetaTag('OG Image', getMeta('meta[property="og:image"]')),
        createMetaTag('OG URL', getMeta('meta[property="og:url"]')),
        createMetaTag('OG Type', getMeta('meta[property="og:type"]')),
        createMetaTag('OG Site Name', getMeta('meta[property="og:site_name"]')),
      ];
      
      // Twitter Card Tags
      const twitterTags: MetaTag[] = [
        createMetaTag('Twitter Card', getMeta('meta[name="twitter:card"]')),
        createMetaTag('Twitter Title', getMeta('meta[name="twitter:title"]'), 50, 60),
        createMetaTag('Twitter Description', getMeta('meta[name="twitter:description"]'), 150, 160),
        createMetaTag('Twitter Image', getMeta('meta[name="twitter:image"]')),
        createMetaTag('Twitter Site', getMeta('meta[name="twitter:site"]')),
        createMetaTag('Twitter Creator', getMeta('meta[name="twitter:creator"]')),
      ];
      
      // Technical SEO Tags
      const technicalTags: MetaTag[] = [
        createMetaTag('Viewport', getMeta('meta[name="viewport"]')),
        createMetaTag('Charset', $('meta[charset]').attr('charset')),
        createMetaTag('Language', $('html').attr('lang')),
        createMetaTag('Author', getMeta('meta[name="author"]')),
        createMetaTag('Theme Color', getMeta('meta[name="theme-color"]')),
      ];
      
      const analysis: SEOAnalysis = {
        url,
        title,
        description,
        essentialTags,
        openGraphTags,
        twitterTags,
        technicalTags,
      };
      
      res.json(analysis);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      res.status(500).json({ error: error.message || "Failed to analyze URL" });
    }
  });
}
