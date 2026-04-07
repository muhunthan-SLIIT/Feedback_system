"use client";

import { FeedbackRequest } from "@/lib/types";
import { CopyButton } from "@/components/ui/CopyButton";
import { cn } from "@/lib/utils";

interface FeedbackRequestListProps {
  requests: FeedbackRequest[];
  baseUrl: string;
}

export function FeedbackRequestList({
  requests,
  baseUrl,
}: FeedbackRequestListProps) {
  if (requests.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        No feedback requests yet. Create one to start collecting feedback.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((req) => {
        const publicUrl = `${baseUrl}/feedback/${req.feedbackId}`;
        const isExpired = new Date(req.expiresAt) < new Date();
        const status = req.submitted
          ? "Submitted"
          : isExpired
            ? "Expired"
            : "Active";

        return (
          <div key={req.id} className="card">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium",
                      req.submitted
                        ? "bg-green-100 text-green-800"
                        : isExpired
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-100 text-blue-800",
                    )}
                  >
                    {status}
                  </span>
                  <code className="text-sm bg-gray-100 px-2 py-0.5 rounded">
                    {req.feedbackId}
                  </code>
                </div>
                <p className="text-sm text-gray-600">
                  Session: {req.sessionId}
                </p>
                <p className="text-xs text-gray-400">
                  Expires: {new Date(req.expiresAt).toLocaleString()}
                </p>
                {req.submitted && req.rating && (
                  <p className="text-sm mt-1">Rating: ⭐ {req.rating}/5</p>
                )}
              </div>
              <CopyButton textToCopy={publicUrl} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
