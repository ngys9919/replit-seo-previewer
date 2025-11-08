import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, XCircle, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export type TagStatus = "optimal" | "present" | "missing" | "warning";

interface MetaTagCardProps {
  name: string;
  value?: string;
  status: TagStatus;
  characterCount?: number;
  recommendation: string;
  optimalRange?: string;
}

export default function MetaTagCard({
  name,
  value,
  status,
  characterCount,
  recommendation,
  optimalRange,
}: MetaTagCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const statusConfig = {
    optimal: {
      icon: CheckCircle2,
      variant: "default" as const,
      color: "text-green-600 dark:text-green-400",
      label: "Optimal",
    },
    present: {
      icon: CheckCircle2,
      variant: "secondary" as const,
      color: "text-blue-600 dark:text-blue-400",
      label: "Present",
    },
    warning: {
      icon: AlertTriangle,
      variant: "secondary" as const,
      color: "text-yellow-600 dark:text-yellow-400",
      label: "Needs Improvement",
    },
    missing: {
      icon: XCircle,
      variant: "destructive" as const,
      color: "text-red-600 dark:text-red-400",
      label: "Missing",
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      toast({
        description: "Copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card data-testid={`card-metatag-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-base" data-testid={`text-tagname-${name.toLowerCase().replace(/\s+/g, '-')}`}>
            {name}
          </h3>
        </div>
        <Badge variant={config.variant} className="shrink-0" data-testid={`badge-status-${status}`}>
          <StatusIcon className="h-3 w-3 mr-1" />
          {config.label}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {value ? (
          <div className="relative">
            <div className="bg-muted p-3 rounded-md font-mono text-xs break-all" data-testid="text-tag-value">
              {value}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-7 w-7"
              onClick={handleCopy}
              data-testid="button-copy"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
        ) : (
          <div className="bg-muted/50 p-3 rounded-md text-xs text-muted-foreground italic">
            Not found
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <StatusIcon className={`h-4 w-4 ${config.color}`} />
          <span className="text-muted-foreground">{recommendation}</span>
        </div>
      </CardContent>
      {(characterCount !== undefined || optimalRange) && (
        <CardFooter className="text-xs text-muted-foreground border-t pt-3">
          {characterCount !== undefined && (
            <span data-testid="text-character-count">
              {characterCount} characters
            </span>
          )}
          {optimalRange && (
            <span className="ml-auto" data-testid="text-optimal-range">
              Optimal: {optimalRange}
            </span>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
