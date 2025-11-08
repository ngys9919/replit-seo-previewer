import { z } from "zod";

// SEO Analysis Request Schema
export const seoAnalysisRequestSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export type SEOAnalysisRequest = z.infer<typeof seoAnalysisRequestSchema>;

// Meta Tag Status
export type MetaTagStatus = "optimal" | "present" | "warning" | "missing";

// Individual Meta Tag
export const metaTagSchema = z.object({
  name: z.string(),
  content: z.string().optional(),
  status: z.enum(["optimal", "present", "warning", "missing"]),
  recommendation: z.string().optional(),
  characterCount: z.number().optional(),
  optimalRange: z.string().optional(),
});

export type MetaTag = z.infer<typeof metaTagSchema>;

// SEO Analysis Response (what components expect)
export interface SEOAnalysis {
  url: string;
  title?: string;
  description?: string;
  essentialTags: MetaTag[];
  openGraphTags: MetaTag[];
  twitterTags: MetaTag[];
  technicalTags: MetaTag[];
}
