import MetaTagsList from '../MetaTagsList';

export default function MetaTagsListExample() {
  const tags = [
    {
      name: "Title Tag",
      value: "SEO Meta Tag Analyzer - Check Website SEO Tags",
      status: "optimal" as const,
      characterCount: 52,
      recommendation: "Perfect length for search results",
      optimalRange: "50-60 chars",
    },
    {
      name: "Meta Description",
      value: "Analyze and validate SEO meta tags for any website. Get Google and social media previews with best practice recommendations for optimal search engine visibility.",
      status: "warning" as const,
      characterCount: 168,
      recommendation: "Slightly long - may be truncated in search results",
      optimalRange: "150-160 chars",
    },
    {
      name: "Canonical URL",
      status: "missing" as const,
      recommendation: "Add canonical URL to avoid duplicate content issues",
    },
  ];

  return <MetaTagsList tags={tags} title="Essential SEO Tags" />;
}
