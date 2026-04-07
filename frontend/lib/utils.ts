import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateFeedbackFormConfig(
  config: import("./types").UpdateFeedbackFormRequest,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!config.headerText.trim()) errors.headerText = "Header text is required";
  else if (config.headerText.length > 80)
    errors.headerText = "Max 80 characters";

  if (!config.headerDescription.trim()) errors.headerDescription = "Required";
  else if (config.headerDescription.length > 200)
    errors.headerDescription = "Max 200 characters";

  if (!config.footerText.trim()) errors.footerText = "Required";
  else if (config.footerText.length > 120)
    errors.footerText = "Max 120 characters";

  if (config.ratingLabels.length !== 5) {
    errors.ratingLabels = "Must have exactly 5 rating labels";
  } else {
    config.ratingLabels.forEach((label, index) => {
      if (!label.trim()) errors[`ratingLabels[${index}]`] = "Cannot be empty";
      else if (label.length > 24)
        errors[`ratingLabels[${index}]`] = "Max 24 characters";
    });
  }

  if (!config.thankYouText.trim()) errors.thankYouText = "Required";
  else if (config.thankYouText.length > 120)
    errors.thankYouText = "Max 120 characters";

  if (!config.invalidReplyText.trim()) errors.invalidReplyText = "Required";
  else if (config.invalidReplyText.length > 120)
    errors.invalidReplyText = "Max 120 characters";

  if (!config.expiredReplyText.trim()) errors.expiredReplyText = "Required";
  else if (config.expiredReplyText.length > 120)
    errors.expiredReplyText = "Max 120 characters";

  const validChannels = ["WhatsApp", "Instagram", "Messenger", "WebChat"];
  const seen = new Set<string>();
  config.skipForChannels.forEach((channel, index) => {
    if (!validChannels.includes(channel))
      errors[`skipForChannels[${index}]`] = `Invalid: ${channel}`;
    if (seen.has(channel))
      errors[`skipForChannels[${index}]`] = "Duplicate not allowed";
    seen.add(channel);
  });

  return errors;
}
