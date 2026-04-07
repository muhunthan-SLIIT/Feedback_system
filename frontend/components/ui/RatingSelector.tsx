import { cn } from "@/lib/utils";

interface RatingSelectorProps {
  labels: string[];
  selectedRating: number | null;
  onSelect: (rating: number) => void;
  disabled?: boolean;
}

export function RatingSelector({
  labels,
  selectedRating,
  onSelect,
  disabled,
}: RatingSelectorProps) {
  if (labels.length !== 5)
    return <p className="text-danger">Error: Expected 5 rating labels</p>;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => !disabled && onSelect(rating)}
            disabled={disabled}
            className={cn(
              "p-3 border-2 rounded-lg text-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary",
              selectedRating === rating
                ? "border-primary bg-blue-50 text-primary font-medium"
                : "border-gray-300 hover:border-primary hover:bg-gray-50",
              disabled &&
                "opacity-50 cursor-not-allowed hover:border-gray-300 hover:bg-transparent",
            )}
          >
            <div className="text-2xl font-bold">{rating}</div>
            <div className="text-xs text-gray-600 mt-1">
              {labels[rating - 1]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
