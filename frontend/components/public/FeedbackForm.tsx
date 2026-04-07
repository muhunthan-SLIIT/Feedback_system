"use client";

import { useState } from "react";
import { PublicFeedbackData } from "@/lib/types";
import { RatingSelector } from "@/components/ui/RatingSelector";
import { Button } from "@/components/ui/Button";

export function FeedbackForm({
  feedbackData,
  onSubmit,
}: {
  feedbackData: PublicFeedbackData;
  onSubmit: (rating: number) => Promise<void>;
}) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedRating) {
      setSubmitError("Please select a rating");
      return;
    }
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await onSubmit(selectedRating);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card space-y-6">
      <div>
        <h2 className="text-xl font-bold">{feedbackData.headerText}</h2>
        <p className="text-gray-600 mt-2">{feedbackData.headerDescription}</p>
      </div>
      <div>
        <p className="text-sm font-medium mb-3">Select your rating:</p>
        <RatingSelector
          labels={feedbackData.ratingLabels}
          selectedRating={selectedRating}
          onSelect={setSelectedRating}
          disabled={isSubmitting}
        />
        {submitError && (
          <p className="mt-2 text-sm text-danger">{submitError}</p>
        )}
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!selectedRating || isSubmitting}
          size="lg"
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </div>
      <p className="text-sm text-gray-500 text-center italic">
        {feedbackData.footerText}
      </p>
    </div>
  );
}
