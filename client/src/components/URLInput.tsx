import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";

interface URLInputProps {
  onAnalyze: (url: string) => void;
  isLoading?: boolean;
}

export default function URLInput({ onAnalyze, isLoading = false }: URLInputProps) {
  const [url, setUrl] = useState("https://");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Ensure the value always starts with "https://"
    if (newValue.startsWith("https://")) {
      setUrl(newValue);
    } else {
      setUrl("https://");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only submit if there's more than just "https://"
    if (url.length > 8) {
      onAnalyze(url);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={handleChange}
              className="pl-9 h-14 text-base"
              disabled={isLoading}
              data-testid="input-url"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={url.length <= 8 || isLoading}
            className="h-14 px-6"
            data-testid="button-analyze"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze SEO"
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Enter a domain to analyze SEO meta tags and preview search results
        </p>
      </form>
    </div>
  );
}
