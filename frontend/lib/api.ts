import {
  CreateEnterpriseRequest,
  CreateFeedbackRequestDto,
  Enterprise,
  FeedbackRequest,
} from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) {
    const error: any = new Error(data.message || "Request failed");
    error.status = response.status;
    error.details = data.details;
    throw error;
  }
  return data;
}

export const adminApi = {
  getFeedbackForm: (enterpriseId: string) =>
    request<import("./types").FeedbackFormConfig>(
      `/api/admin/enterprises/${enterpriseId}/session-feedback-form`,
    ),
  updateFeedbackForm: (
    enterpriseId: string,
    data: import("./types").UpdateFeedbackFormRequest,
  ) =>
    request<import("./types").FeedbackFormConfig>(
      `/api/admin/enterprises/${enterpriseId}/session-feedback-form`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
    ),
};

export const publicApi = {
  getFeedbackData: (feedbackId: string) =>
    request<import("./types").PublicFeedbackData>(
      `/api/public/feedback/${feedbackId}`,
    ),
  submitFeedback: (feedbackId: string, rating: number) =>
    request<import("./types").FeedbackSubmitResponse>(
      `/api/public/feedback/${feedbackId}/respond`,
      {
        method: "POST",
        body: JSON.stringify({ rating }),
      },
    ),
};

export const demoApi = {
  resetDemoData: () =>
    request<{ message: string }>("/api/dev/demo/reset", { method: "POST" }),
};

// Add to existing api.ts

export const adminEnterpriseApi = {
  listEnterprises: () => request<Enterprise[]>("/api/admin/enterprises"),
  getEnterprise: (id: string) =>
    request<Enterprise>(`/api/admin/enterprises/${id}`),
  createEnterprise: (data: CreateEnterpriseRequest) =>
    request<Enterprise>("/api/admin/enterprises", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export const adminFeedbackRequestApi = {
  listByEnterprise: (enterpriseId: string) =>
    request<FeedbackRequest[]>(
      `/api/admin/enterprises/${enterpriseId}/feedback-requests`,
    ),
  create: (enterpriseId: string, data: CreateFeedbackRequestDto) =>
    request<FeedbackRequest>(
      `/api/admin/enterprises/${enterpriseId}/feedback-requests`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    ),
  getById: (feedbackId: string) =>
    request<FeedbackRequest>(`/api/admin/feedback-requests/${feedbackId}`),
};
