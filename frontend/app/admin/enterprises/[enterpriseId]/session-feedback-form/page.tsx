"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminApi } from "@/lib/api";
import { FeedbackFormConfig, UpdateFeedbackFormRequest } from "@/lib/types";
import { FeedbackFormEditor } from "@/components/admin/FeedbackFormEditor";
import { Button } from "@/components/ui/Button";

export default function AdminFeedbackFormPage() {
  const params = useParams();
  const router = useRouter();
  const enterpriseId = params.enterpriseId as string;

  const [config, setConfig] = useState<FeedbackFormConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await adminApi.getFeedbackForm(enterpriseId);
        setConfig(data);
        setError(null);
      } catch (err: any) {
        if (err.status === 404) {
          // No config exists yet - start with defaults
          setError(
            "No feedback form configured yet. Fill in the form below to create one.",
          );
          setConfig(getDefaultConfig());
        } else {
          setError(err.message || "Failed to load configuration");
        }
      } finally {
        setLoading(false);
      }
    };
    loadConfig();
  }, [enterpriseId]);

  const handleSave = async (data: UpdateFeedbackFormRequest) => {
    setIsSaving(true);
    try {
      const updated = await adminApi.updateFeedbackForm(enterpriseId, data);
      setConfig(updated);
      setError(null);
      return Promise.resolve();
    } catch (err: any) {
      // Re-throw so the editor can show validation errors
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    router.push(`/admin/enterprises/${enterpriseId}`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={handleBack}>
            ← Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        </div>
        <div className="card py-8 text-center text-gray-500">
          Fetching feedback form configuration...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={handleBack}>
          ← Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Feedback Form Configuration</h1>
          <p className="text-gray-600">Enterprise ID: {enterpriseId}</p>
        </div>
      </div>

      {/* Info Banner */}
      {error && !config && (
        <div className="card bg-yellow-50 border border-yellow-200 text-yellow-800">
          {error}
        </div>
      )}
      {error && config && (
        <div className="card bg-blue-50 border border-blue-200 text-blue-800">
          ℹ️ {error}
        </div>
      )}

      {/* Editor */}
      {config && (
        <FeedbackFormEditor
          initialConfig={config}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}

function getDefaultConfig(): FeedbackFormConfig {
  return {
    headerText: "How was your chat experience?",
    headerDescription:
      "Please rate your recent conversation with our support team.",
    footerText: "Your feedback helps us improve.",
    ratingLabels: ["Very Poor", "Poor", "Okay", "Good", "Excellent"],
    thankYouText: "Thank you for your feedback!",
    invalidReplyText: "This feedback link is no longer valid.",
    expiredReplyText: "Sorry, this feedback request has expired.",
    skipForChannels: [],
  };
}
