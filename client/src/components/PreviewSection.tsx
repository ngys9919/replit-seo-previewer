import GooglePreview from "./GooglePreview";
import FacebookPreview from "./FacebookPreview";
import TwitterPreview from "./TwitterPreview";

interface PreviewSectionProps {
  title: string;
  description: string;
  url: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export default function PreviewSection({
  title,
  description,
  url,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
}: PreviewSectionProps) {
  return (
    <div className="space-y-6 sticky top-6">
      <div>
        <h2 className="text-lg font-semibold mb-3">Google Search Preview</h2>
        <GooglePreview
          title={title}
          description={description}
          url={url}
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-3">Facebook Preview</h2>
        <FacebookPreview
          title={ogTitle || title}
          description={ogDescription || description}
          image={ogImage}
          url={url}
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-3">Twitter Preview</h2>
        <TwitterPreview
          title={twitterTitle || ogTitle || title}
          description={twitterDescription || ogDescription || description}
          image={twitterImage || ogImage}
          url={url}
        />
      </div>
    </div>
  );
}
