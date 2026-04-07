"use client";

import { useState } from "react";
import {
  FeedbackFormConfig,
  UpdateFeedbackFormRequest,
  VALID_CHANNELS,
} from "@/lib/types";
import { validateFeedbackFormConfig } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { ValidationErrors } from "@/components/admin/ValidationErrors";
import { FeedbackFormPreview } from "@/components/admin/FeedbackFormPreview";
import { cn } from "@/lib/utils";

interface FeedbackFormEditorProps {
  initialConfig: FeedbackFormConfig;
  onSave: (data: UpdateFeedbackFormRequest) => Promise<void>;
  isSaving?: boolean;
}

export function FeedbackFormEditor({
  initialConfig,
  onSave,
}: FeedbackFormEditorProps) {
  const [formData, setFormData] = useState<UpdateFeedbackFormRequest>({
    ...initialConfig,
    ratingLabels: [...initialConfig.ratingLabels],
    skipForChannels: [...initialConfig.skipForChannels],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (
    field: keyof UpdateFeedbackFormRequest,
    value: string | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field])
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
  };

  const handleRatingLabelChange = (index: number, value: string) => {
    const newLabels = [...formData.ratingLabels];
    newLabels[index] = value;
    handleChange("ratingLabels", newLabels);
  };

  const handleChannelToggle = (channel: string) => {
    const channels = formData.skipForChannels.includes(channel)
      ? formData.skipForChannels.filter((c) => c !== channel)
      : [...formData.skipForChannels, channel];
    handleChange("skipForChannels", channels);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);
    const validationErrors = validateFeedbackFormConfig(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSaving(true);
    try {
      await onSave(formData);
      setSaveSuccess(true);
    } catch (err: any) {
      if (err.details) setErrors(err.details);
      else setErrors({ submit: err.message || "Failed to save" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ValidationErrors errors={errors} />
      {saveSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          Saved!
        </div>
      )}

      <div className="card space-y-4">
        <h3 className="text-lg font-semibold">Form Content</h3>
        <div>
          <label className="block text-sm font-medium mb-1">
            Header Text *
          </label>
          <Input
            value={formData.headerText}
            onChange={(e) => handleChange("headerText", e.target.value)}
            maxLength={80}
            error={errors.headerText}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.headerText.length}/80
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Header Description *
          </label>
          <TextArea
            value={formData.headerDescription}
            onChange={(e) => handleChange("headerDescription", e.target.value)}
            maxLength={200}
            rows={3}
            error={errors.headerDescription}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.headerDescription.length}/200
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Footer Text *
          </label>
          <Input
            value={formData.footerText}
            onChange={(e) => handleChange("footerText", e.target.value)}
            maxLength={120}
            error={errors.footerText}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.footerText.length}/120
          </p>
        </div>
      </div>

      <div className="card space-y-4">
        <h3 className="text-lg font-semibold">Rating Labels *</h3>
        <p className="text-sm text-gray-600">
          Exactly 5 labels, max 24 chars each
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i}>
              <label className="block text-sm font-medium mb-1">
                Rating {i + 1}
              </label>
              <Input
                value={formData.ratingLabels[i]}
                onChange={(e) => handleRatingLabelChange(i, e.target.value)}
                maxLength={24}
                error={errors[`ratingLabels[${i}]`]}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.ratingLabels[i].length}/24
              </p>
            </div>
          ))}
        </div>
        {errors.ratingLabels && (
          <p className="text-sm text-danger">{errors.ratingLabels}</p>
        )}
      </div>

      <div className="card space-y-4">
        <h3 className="text-lg font-semibold">Response Messages</h3>
        {["thankYouText", "invalidReplyText", "expiredReplyText"].map(
          (field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">
                {field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}{" "}
                *
              </label>
              <Input
                value={
                  formData[field as keyof UpdateFeedbackFormRequest] as string
                }
                onChange={(e) =>
                  handleChange(
                    field as keyof UpdateFeedbackFormRequest,
                    e.target.value,
                  )
                }
                maxLength={120}
                error={errors[field]}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {
                  (formData[field as keyof UpdateFeedbackFormRequest] as string)
                    .length
                }
                /120
              </p>
            </div>
          ),
        )}
      </div>

      <div className="card space-y-4">
        <h3 className="text-lg font-semibold">Skip for Channels</h3>
        <div className="flex flex-wrap gap-2">
          {VALID_CHANNELS.map((channel) => (
            <button
              key={channel}
              type="button"
              onClick={() => handleChannelToggle(channel)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                formData.skipForChannels.includes(channel)
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:border-primary",
              )}
            >
              {channel}
            </button>
          ))}
        </div>
        {errors.skipForChannels && (
          <p className="text-sm text-danger">{errors.skipForChannels}</p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Configuration"}
        </Button>
      </div>

      <FeedbackFormPreview config={formData as FeedbackFormConfig} />
    </form>
  );
}
