import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface FacebookPreviewProps {
  title: string;
  description: string;
  image?: string;
  url: string;
}

export default function FacebookPreview({ title, description, image, url }: FacebookPreviewProps) {
  const domain = url.replace(/^https?:\/\//, '').split('/')[0].toUpperCase();

  return (
    <Card className="overflow-hidden" data-testid="card-facebook-preview">
      <div className="aspect-[1.91/1] bg-muted flex items-center justify-center border-b">
        {image ? (
          <img src={image} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Globe className="h-12 w-12" />
            <span className="text-xs">og:image</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-card">
        <div className="text-xs text-muted-foreground uppercase mb-1" data-testid="text-facebook-domain">
          {domain}
        </div>
        <h4 className="font-semibold text-base mb-1 line-clamp-2" data-testid="text-facebook-title">
          {title || 'Open Graph Title'}
        </h4>
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid="text-facebook-description">
          {description || 'Open Graph description for Facebook sharing'}
        </p>
      </div>
    </Card>
  );
}
