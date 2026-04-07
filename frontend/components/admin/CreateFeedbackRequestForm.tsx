"use client";

import { useState } from "react";
import { adminFeedbackRequestApi } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ValidationErrors } from "@/components/admin/ValidationErrors";

interface CreateFeedbackRequestFormProps {
  enterpriseId: string;
  onSuccess: (feedbackId: string) => void;
}

export function CreateFeedbackRequestForm({
  enterpriseId,
  onSuccess,
}: CreateFeedbackRequestFormProps) {
  const [sessionId, setSessionId] = useState("");
  const [expiresHours, setExpiresHours] = useState(24);
  const [customFeedbackId, setCustomFeedbackId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [generatedId, setGeneratedId] = useState<string | null>(null);

  const generateRandomId = () => {
    const id = `fb-${Math.random().toString(36).substring(2, 8)}-${Date.now().toString(36).substring(4)}`;
    setCustomFeedbackId(id);
    setGeneratedId(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!sessionId.trim()) newErrors.sessionId = "Session ID is required";
    if (expiresHours < 1) newErrors.expiresHours = "Must be at least 1 hour";
    if (expiresHours > 720) newErrors.expiresHours = "Max 30 days (720 hours)";
    if (customFeedbackId && customFeedbackId.length > 50) {
      newErrors.feedbackId = "Max 50 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsCreating(true);
    try {
      const created = await adminFeedbackRequestApi.create(enterpriseId, {
        sessionId: sessionId.trim(),
        expiresHours,
        feedbackId: customFeedbackId || undefined,
      });
      onSuccess(created.feedbackId);
      setSessionId("");
      setCustomFeedbackId("");
      setGeneratedId(null);
      setErrors({});
    } catch (err: any) {
      if (err.details) setErrors(err.details);
      else
        setErrors({
          submit: err.message || "Failed to create feedback request",
        });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h3 className="text-lg font-semibold">Create New Feedback Request</h3>
      <ValidationErrors errors={errors} />

      <div>
        <label className="block text-sm font-medium mb-1">Session ID *</label>
        <Input
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          placeholder="e.g., chat-session-abc123"
          error={errors.sessionId}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Internal identifier for this chat session
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Expires In (hours)
        </label>
        <Input
          type="number"
          min={1}
          max={720}
          value={expiresHours}
          onChange={(e) => setExpiresHours(parseInt(e.target.value) || 24)}
          error={errors.expiresHours}
        />
        <p className="text-xs text-gray-500 mt-1">
          Link will expire after this many hours (max 30 days)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Custom Feedback ID (optional)
        </label>
        <div className="flex gap-2">
          <Input
            value={customFeedbackId}
            onChange={(e) => setCustomFeedbackId(e.target.value)}
            placeholder="Leave blank to auto-generate"
            maxLength={50}
            error={errors.feedbackId}
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={generateRandomId}
          >
            Generate
          </Button>
        </div>
        {generatedId && (
          <p className="text-xs text-green-600 mt-1">
            ✓ Generated: {generatedId}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Leave blank for auto-generated unique ID
        </p>
      </div>

      <Button type="submit" disabled={isCreating}>
        {isCreating ? "Creating..." : "Create Feedback Link"}
      </Button>
    </form>
  );
}
