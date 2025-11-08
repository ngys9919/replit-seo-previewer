import { useState } from "react";
import URLInput from "@/components/URLInput";
import PreviewSection from "@/components/PreviewSection";
import MetaTagsList from "@/components/MetaTagsList";
import { type TagStatus } from "@/components/MetaTagCard";

interface MetaTag {
  name: string;
  value?: string;
  status: TagStatus;
  characterCount?: number;
  recommendation: string;
  optimalRange?: string;
}

export default function Home() {
  const [analyzed, setAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = (url: string) => {
    console.log('Analyzing URL:', url);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setAnalyzed(true);
    }, 1500);
  };

  const essentialTags: MetaTag[] = [
    {
      name: "Title Tag",
      value: "SEO Meta Tag Analyzer - Check Website SEO Tags",
      status: "optimal",
      characterCount: 52,
      recommendation: "Perfect length for search results",
      optimalRange: "50-60 chars",
    },
    {
      name: "Meta Description",
      value: "Analyze and validate SEO meta tags for any website. Get Google and social media previews with best practice recommendations for optimal search engine visibility.",
      status: "warning",
      characterCount: 168,
      recommendation: "Slightly long - may be truncated in search results",
      optimalRange: "150-160 chars",
    },
  ];

  const openGraphTags: MetaTag[] = [
    {
      name: "og:title",
      value: "SEO Meta Tag Analyzer - Check Website SEO Tags",
      status: "present",
      characterCount: 52,
      recommendation: "Title is present for social sharing",
    },
    {
      name: "og:description",
      value: "Analyze and validate SEO meta tags for any website. Get instant feedback on your meta tags.",
      status: "optimal",
      characterCount: 98,
      recommendation: "Good length for social sharing",
      optimalRange: "60-110 chars",
    },
    {
      name: "og:image",
      status: "missing",
      recommendation: "Add an image for better social media previews (recommended: 1200x630px)",
    },
    {
      name: "og:url",
      value: "https://example.com/seo-analyzer",
      status: "present",
      recommendation: "Canonical URL for social sharing is present",
    },
  ];

  const twitterTags: MetaTag[] = [
    {
      name: "twitter:card",
      value: "summary_large_image",
      status: "optimal",
      recommendation: "Using large image format for better visibility",
    },
    {
      name: "twitter:title",
      value: "SEO Meta Tag Analyzer",
      status: "present",
      characterCount: 23,
      recommendation: "Title is present for Twitter cards",
    },
    {
      name: "twitter:description",
      value: "Analyze and validate SEO meta tags for any website",
      status: "optimal",
      characterCount: 52,
      recommendation: "Good length for Twitter cards",
    },
    {
      name: "twitter:image",
      status: "missing",
      recommendation: "Add an image for Twitter card previews",
    },
  ];

  const technicalTags: MetaTag[] = [
    {
      name: "Canonical URL",
      status: "missing",
      recommendation: "Add canonical URL to avoid duplicate content issues",
    },
    {
      name: "Robots Meta Tag",
      value: "index, follow",
      status: "optimal",
      recommendation: "Page is set to be indexed and followed by search engines",
    },
    {
      name: "Viewport",
      value: "width=device-width, initial-scale=1",
      status: "optimal",
      recommendation: "Mobile-friendly viewport configuration is present",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <h1 className="text-xl font-semibold" data-testid="text-app-title">
            SEO Meta Tag Analyzer
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <URLInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>

        {analyzed && (
          <div className="grid lg:grid-cols-[1fr,400px] gap-8 items-start">
            <div className="space-y-8">
              <MetaTagsList tags={essentialTags} title="Essential SEO Tags" />
              <MetaTagsList tags={openGraphTags} title="Open Graph Tags" />
              <MetaTagsList tags={twitterTags} title="Twitter Card Tags" />
              <MetaTagsList tags={technicalTags} title="Technical SEO" />
            </div>

            <div className="lg:block hidden">
              <PreviewSection
                title="SEO Meta Tag Analyzer - Check Website SEO Tags"
                description="Analyze and validate SEO meta tags for any website. Get Google and social media previews with best practice recommendations for optimal search engine visibility."
                url="https://example.com/seo-analyzer"
                ogTitle="SEO Meta Tag Analyzer - Check Website SEO Tags"
                ogDescription="Analyze and validate SEO meta tags for any website. Get instant feedback on your meta tags."
                twitterTitle="SEO Meta Tag Analyzer"
                twitterDescription="Analyze and validate SEO meta tags for any website"
              />
            </div>
          </div>
        )}

        {!analyzed && (
          <div className="max-w-3xl mx-auto text-center space-y-6 py-12">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Validate Your SEO Meta Tags</h2>
              <p className="text-muted-foreground">
                Enter a URL above to analyze meta tags and see how your page appears in search results and social media
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 pt-6">
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="font-semibold">Google Preview</h3>
                <p className="text-sm text-muted-foreground">
                  See exactly how your page appears in Google search results
                </p>
              </div>
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold">Social Media</h3>
                <p className="text-sm text-muted-foreground">
                  Preview Facebook and Twitter card appearances
                </p>
              </div>
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-semibold">Best Practices</h3>
                <p className="text-sm text-muted-foreground">
                  Get actionable recommendations for optimization
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
