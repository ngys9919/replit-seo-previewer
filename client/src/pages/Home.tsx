import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import URLInput from "@/components/URLInput";
import { SEODashboard } from "@/components/SEODashboard";
import { CategoryOverview } from "@/components/CategoryOverview";
import PreviewSection from "@/components/PreviewSection";
import MetaTagsList from "@/components/MetaTagsList";
import { type SEOAnalysis } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);

  const analyzeMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("POST", "/api/analyze", { url });
      return response.json();
    },
    onSuccess: (data: SEOAnalysis) => {
      setAnalysis(data);
      toast({
        title: "Analysis Complete",
        description: "SEO meta tags have been analyzed successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze URL. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = (url: string) => {
    analyzeMutation.mutate(url);
  };

  const handleCategoryClick = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Helper to extract preview data from analysis
  const getPreviewData = () => {
    if (!analysis) return null;

    const ogTitle = analysis.openGraphTags.find(t => t.name === "OG Title")?.content;
    const ogDescription = analysis.openGraphTags.find(t => t.name === "OG Description")?.content;
    const ogImage = analysis.openGraphTags.find(t => t.name === "OG Image")?.content;
    const twitterTitle = analysis.twitterTags.find(t => t.name === "Twitter Title")?.content;
    const twitterDescription = analysis.twitterTags.find(t => t.name === "Twitter Description")?.content;
    const twitterImage = analysis.twitterTags.find(t => t.name === "Twitter Image")?.content;

    return {
      title: analysis.title || "",
      description: analysis.description || "",
      url: analysis.url,
      ogTitle,
      ogDescription,
      ogImage,
      twitterTitle,
      twitterDescription,
      twitterImage,
    };
  };

  const previewData = getPreviewData();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold" data-testid="text-app-title">
            SEO Meta Tag Analyzer
          </h1>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Analyze and optimize your website's SEO
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* URL Input Section */}
        <section className="mb-12">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Optimize Your Website's SEO
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Analyze meta tags, validate SEO best practices, and preview how your site appears on Google, Facebook, and Twitter
            </p>
            <URLInput
              onAnalyze={handleAnalyze}
              isLoading={analyzeMutation.isPending}
            />
          </div>
        </section>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-12">
            {/* SEO Performance Dashboard */}
            <section>
              <SEODashboard analysis={analysis} />
            </section>

            {/* Category Overview */}
            <section>
              <CategoryOverview
                analysis={analysis}
                onCategoryClick={handleCategoryClick}
              />
            </section>

            {/* Two-column layout for previews and meta tags */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Meta Tags List (Left - 3 columns) */}
              <section className="lg:col-span-3 space-y-8">
                <div id="essential">
                  <h2 className="text-2xl font-semibold mb-4">Essential SEO Tags</h2>
                  <MetaTagsList
                    tags={analysis.essentialTags.map(t => ({
                      name: t.name,
                      value: t.content,
                      status: t.status as any,
                      characterCount: t.characterCount,
                      recommendation: t.recommendation || "",
                      optimalRange: t.optimalRange,
                    }))}
                  />
                </div>

                <div id="opengraph">
                  <h2 className="text-2xl font-semibold mb-4">Open Graph Tags</h2>
                  <MetaTagsList
                    tags={analysis.openGraphTags.map(t => ({
                      name: t.name,
                      value: t.content,
                      status: t.status as any,
                      characterCount: t.characterCount,
                      recommendation: t.recommendation || "",
                      optimalRange: t.optimalRange,
                    }))}
                  />
                </div>

                <div id="twitter">
                  <h2 className="text-2xl font-semibold mb-4">Twitter Card Tags</h2>
                  <MetaTagsList
                    tags={analysis.twitterTags.map(t => ({
                      name: t.name,
                      value: t.content,
                      status: t.status as any,
                      characterCount: t.characterCount,
                      recommendation: t.recommendation || "",
                      optimalRange: t.optimalRange,
                    }))}
                  />
                </div>

                <div id="technical">
                  <h2 className="text-2xl font-semibold mb-4">Technical SEO</h2>
                  <MetaTagsList
                    tags={analysis.technicalTags.map(t => ({
                      name: t.name,
                      value: t.content,
                      status: t.status as any,
                      characterCount: t.characterCount,
                      recommendation: t.recommendation || "",
                      optimalRange: t.optimalRange,
                    }))}
                  />
                </div>
              </section>

              {/* Preview Section (Right - 2 columns, sticky) */}
              <section className="lg:col-span-2">
                {previewData && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Preview</h2>
                    <PreviewSection {...previewData} />
                  </div>
                )}
              </section>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!analysis && !analyzeMutation.isPending && (
          <div className="max-w-3xl mx-auto text-center py-16">
            <div className="space-y-4">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold">Ready to Analyze</h3>
              <p className="text-muted-foreground">
                Enter a URL above to get a comprehensive SEO analysis with actionable recommendations
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Analyze and optimize your website's SEO performance</p>
        </div>
      </footer>
    </div>
  );
}
