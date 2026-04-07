import { FeedbackFormConfig } from "@/lib/types";
import { RatingSelector } from "@/components/ui/RatingSelector";

export function FeedbackFormPreview({
  config,
}: {
  config: FeedbackFormConfig;
}) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Preview</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">{config.headerText}</h4>
          <p className="text-sm text-gray-600 mt-1">
            {config.headerDescription}
          </p>
        </div>
        <RatingSelector
          labels={config.ratingLabels}
          selectedRating={null}
          onSelect={() => {}}
          disabled
        />
        <p className="text-sm text-gray-500 italic">{config.footerText}</p>
      </div>
    </div>
  );
}
