export interface FeedbackFormConfig {
  headerText: string;
  headerDescription: string;
  footerText: string;
  ratingLabels: string[];
  thankYouText: string;
  invalidReplyText: string;
  expiredReplyText: string;
  skipForChannels: string[];
}

export interface UpdateFeedbackFormRequest {
  headerText: string;
  headerDescription: string;
  footerText: string;
  ratingLabels: string[];
  thankYouText: string;
  invalidReplyText: string;
  expiredReplyText: string;
  skipForChannels: string[];
}

export interface PublicFeedbackData {
  feedbackId: string;
  enterpriseName: string;
  headerText: string;
  headerDescription: string;
  footerText: string;
  ratingLabels: string[];
  isExpired: boolean;
  isAlreadySubmitted: boolean;
}

export interface FeedbackSubmitResponse {
  success: boolean;
  message: string;
}

// Add to existing types.ts

export interface Enterprise {
  id: string;
  name: string;
  createdAt: string;
}

export interface CreateEnterpriseRequest {
  name: string;
}

export interface FeedbackRequest {
  id: string;
  feedbackId: string;
  enterpriseId: string;
  sessionId: string;
  expiresAt: string;
  submitted: boolean;
  submittedAt: string | null;
  rating: number | null;
  createdAt: string;
}

export interface CreateFeedbackRequestDto {
  sessionId: string;
  expiresHours: number;
  feedbackId?: string;
}

export const VALID_CHANNELS = [
  "WhatsApp",
  "Instagram",
  "Messenger",
  "WebChat",
] as const;
export type ValidChannel = (typeof VALID_CHANNELS)[number];
