import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface TwitterPreviewProps {
  title: string;
  description: string;
  image?: string;
  url: string;
}

export default function TwitterPreview({ title, description, image, url }: TwitterPreviewProps) {
  const domain = url.replace(/^https?:\/\//, '').split('/')[0];

  return (
    <Card className="overflow-hidden border rounded-lg" data-testid="card-twitter-preview">
      <div className="aspect-[2/1] bg-muted flex items-center justify-center border-b">
        {image ? (
          <img src={image} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Globe className="h-10 w-10" />
            <span className="text-xs">twitter:image</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-card">
        <h4 className="font-semibold text-sm mb-1 line-clamp-1" data-testid="text-twitter-title">
          {title || 'Twitter Card Title'}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2" data-testid="text-twitter-description">
          {description || 'Twitter card description'}
        </p>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Globe className="h-3 w-3" />
          {domain}
        </div>
      </div>
    </Card>
  );
}
