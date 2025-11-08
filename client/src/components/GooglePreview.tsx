import { Card } from "@/components/ui/card";

interface GooglePreviewProps {
  title: string;
  url: string;
  description: string;
}

export default function GooglePreview({ title, url, description }: GooglePreviewProps) {
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const breadcrumbs = displayUrl.split('/').slice(0, 3);

  return (
    <Card className="p-6" data-testid="card-google-preview">
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
            G
          </div>
          <div className="text-xs text-muted-foreground" data-testid="text-google-url">
            {breadcrumbs.map((part, i) => (
              <span key={i}>
                {part}
                {i < breadcrumbs.length - 1 && ' › '}
              </span>
            ))}
          </div>
        </div>
        <h3 className="text-xl text-primary hover:underline cursor-pointer font-normal leading-snug" data-testid="text-google-title">
          {title || 'Page Title - Meta Title Tag'}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed" data-testid="text-google-description">
          {description || 'Meta description will appear here. This is what users see in Google search results and should be compelling and informative.'}
        </p>
      </div>
    </Card>
  );
}
