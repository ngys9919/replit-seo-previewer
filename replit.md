# SEO Meta Tag Analyzer

## Overview

This is an SEO Meta Tag Analyzer web application that allows users to analyze and validate SEO meta tags for any website URL. The application fetches a webpage, extracts meta tags, validates them against SEO best practices, and provides visual previews of how the page appears in Google search results, Facebook shares, and Twitter cards. It provides character count analysis, status indicators (optimal/warning/missing), and actionable recommendations for improving SEO.

The app features a comprehensive SEO Performance Dashboard that displays an overall SEO score via a doughnut chart, percentage scoring, performance descriptors (Excellent/Good/Fair/Needs Improvement/Poor), and KPI metrics showing the count of Passed Checks, Warnings, and Failed Checks.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component Library**: shadcn/ui (Radix UI primitives) with Tailwind CSS for styling
- Clean, modern design with card-based layouts
- Comprehensive component library including cards, buttons, forms, dialogs, and data display components
- Responsive grid system for desktop and mobile with two-column layout for meta tags and previews

**Routing**: wouter for lightweight client-side routing

**State Management**: 
- TanStack Query (React Query) for server state management and API data fetching
- Local component state with React hooks for analysis results

**Key UI Components**:
- **URLInput**: URL input form with validation and loading states
  - Always prefixes with "https://"
  - Analyze button disabled until valid URL entered
  - Shows loading state during analysis
- **SEO Performance Dashboard**: Displays at the top of analysis results
  - Doughnut chart visualization showing distribution of passed/warnings/failed checks
  - Overall SEO score calculation: (passed + warnings * 0.5) / totalChecks * 100
  - Performance level badges: Excellent (90%+), Good (75-89%), Fair (60-74%), Needs Improvement (40-59%), Poor (<40%)
  - KPI metrics cards with color-coded icons for Passed Checks, Warnings, and Failed Checks
- **Category Breakdown**: Visual category summaries
  - Four category cards: Essential SEO, Open Graph, Twitter Card, Technical SEO
  - Each card shows: category score, status badge, color-coded progress bar, and pass/warning/fail metrics
  - Cards are clickable and smoothly scroll to detailed sections
  - Category-specific scoring: Excellent (90%+), Good (70-89%), Fair (50-69%), Needs Work (<50%)
- **Preview Cards**: Shows how the page appears in different contexts
  - Google Search Preview
  - Facebook Share Preview
  - Twitter Card Preview
  - Sticky positioning on desktop for easy reference while scrolling
- **Meta Tags Lists**: Detailed analysis of all meta tags by category
  - Essential SEO Tags section
  - Open Graph Tags section
  - Twitter Card Tags section
  - Technical SEO section
  - Each tag card shows name, content, status badge, character count, and recommendations

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**Development Setup**: 
- Vite middleware for development with HMR (Hot Module Reload)
- Custom logging middleware for API request tracking
- Static file serving in production

**API Endpoints**:
- `POST /api/analyze` - Accepts a URL and returns comprehensive SEO analysis
  - Request: `{ url: string }`
  - Response: SEOAnalysis object with categorized meta tags
  - Validates URL format using Zod schemas
  - Fetches and parses HTML using Cheerio
  - Extracts all relevant meta tags

**Web Scraping**:
- Cheerio library for HTML parsing and meta tag extraction
- Validates meta tags against optimal character ranges
  - Title: 50-60 characters optimal
  - Description: 150-160 characters optimal
- Status classification system:
  - `optimal` - Tag present with ideal character count
  - `present` - Tag exists but may not be optimal
  - `warning` - Tag needs attention (too short or too long)
  - `missing` - Tag is not present

### Data Storage

**Current Implementation**: No persistent storage required
- Stateless analysis - each request is independent
- No user data or analysis history stored
- Empty storage interface for future extensibility

**Schema** (`shared/schema.ts`):
- `SEOAnalysisRequest` - URL validation schema
- `MetaTag` - Individual meta tag with status and recommendations
- `SEOAnalysis` - Complete analysis response with all categories
  - `essentialTags[]` - Core SEO meta tags
  - `openGraphTags[]` - Open Graph protocol tags
  - `twitterTags[]` - Twitter Card meta tags
  - `technicalTags[]` - Technical SEO elements

### Data Flow

1. User enters URL → Frontend validates URL format
2. User clicks "Analyze SEO" → POST to `/api/analyze`
3. Backend:
   - Fetches the webpage HTML
   - Parses HTML with Cheerio
   - Extracts meta tags from various selectors
   - Validates character counts against optimal ranges
   - Classifies each tag with status (optimal/present/warning/missing)
   - Returns categorized analysis
4. Frontend:
   - Displays SEO Performance Dashboard with score
   - Shows Category Breakdown with visual summaries
   - Renders Preview cards for Google/Facebook/Twitter
   - Lists all meta tags by category with recommendations

### Key Features

**Comprehensive Analysis**: Checks 20+ meta tags across 4 categories
- Essential SEO (Title, Description, Keywords, Canonical, Robots)
- Open Graph (OG Title, Description, Image, URL, Type, Site Name)
- Twitter Cards (Card Type, Title, Description, Image, Site, Creator)
- Technical SEO (Viewport, Charset, Language, Author, Theme Color)

**Character Count Validation**: Compares against SEO best practices
- Shows current character count vs optimal range
- Provides specific recommendations for improvement

**Visual Feedback**: Color-coded status system
- Green for optimal tags
- Yellow for warnings
- Red for missing tags
- Blue for present tags

**Preview Generation**: Shows real-world appearance
- Google Search result preview
- Facebook share card preview
- Twitter card preview

**Responsive Design**: Works on desktop, tablet, and mobile
- Two-column layout on desktop (meta tags left, previews right sticky)
- Single-column stacked layout on mobile
- Smooth scrolling to detailed sections from category cards

## Development

### Running the Project
```bash
npm run dev  # Starts both Express backend and Vite frontend
```

### Database Migrations
```bash
npm run db:push  # Sync Drizzle schema to database (no tables currently defined)
```

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (automatically set by Replit, not currently used)
- `PORT` - Server port (defaults to 5000)

## Recent Changes

- **2024-11-08**: Converted from National Parks voting app to SEO Meta Tag Analyzer
  - Removed parks and votes database tables
  - Implemented SEO analysis endpoint with Cheerio web scraping
  - Updated all frontend components to display SEO analysis results
  - Added comprehensive meta tag validation and categorization
  - Integrated preview cards for Google, Facebook, and Twitter
  - Created SEO Performance Dashboard with scoring and charts
  - Fixed server initialization to properly create HTTP server
