import MetaTagCard, { type TagStatus } from "./MetaTagCard";

interface MetaTag {
  name: string;
  value?: string;
  status: TagStatus;
  characterCount?: number;
  recommendation: string;
  optimalRange?: string;
}

interface MetaTagsListProps {
  tags: MetaTag[];
  title?: string;
}

export default function MetaTagsList({ tags, title }: MetaTagsListProps) {
  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-lg font-semibold">{title}</h2>
      )}
      <div className="space-y-4">
        {tags.map((tag, index) => (
          <MetaTagCard key={index} {...tag} />
        ))}
      </div>
    </div>
  );
}
