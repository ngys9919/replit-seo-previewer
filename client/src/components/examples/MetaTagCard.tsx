import MetaTagCard from '../MetaTagCard';

export default function MetaTagCardExample() {
  return (
    <div className="space-y-4 max-w-2xl">
      <MetaTagCard
        name="Title Tag"
        value="SEO Meta Tag Analyzer - Check Website SEO Tags"
        status="optimal"
        characterCount={52}
        recommendation="Perfect length for search results"
        optimalRange="50-60 chars"
      />
      <MetaTagCard
        name="Meta Description"
        value="This is a very short description"
        status="warning"
        characterCount={33}
        recommendation="Too short - should be 150-160 characters"
        optimalRange="150-160 chars"
      />
      <MetaTagCard
        name="Canonical URL"
        status="missing"
        recommendation="Add canonical URL to avoid duplicate content issues"
      />
    </div>
  );
}
