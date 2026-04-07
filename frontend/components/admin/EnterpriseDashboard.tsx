"use client";

import { useState, useEffect } from "react";
import { Enterprise, FeedbackRequest } from "@/lib/types";
import { adminFeedbackRequestApi } from "@/lib/api";
import { FeedbackRequestList } from "@/components/admin/FeedbackRequestList";
import { CreateFeedbackRequestForm } from "@/components/admin/CreateFeedbackRequestForm";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface EnterpriseDashboardProps {
  enterprise: Enterprise;
}

export function EnterpriseDashboard({ enterprise }: EnterpriseDashboardProps) {
  const [requests, setRequests] = useState<FeedbackRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newFeedbackId, setNewFeedbackId] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await adminFeedbackRequestApi.listByEnterprise(
          enterprise.id,
        );
        setRequests(data);
      } catch (err) {
        console.error("Failed to load requests:", err);
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, [enterprise.id]);

  const handleRequestCreated = (feedbackId: string) => {
    setNewFeedbackId(feedbackId);
    // Refresh list
    adminFeedbackRequestApi.listByEnterprise(enterprise.id).then(setRequests);
    setShowCreateForm(false);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{enterprise.name}</h1>
          <p className="text-gray-600">ID: {enterprise.id}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/enterprises/${enterprise.id}/session-feedback-form`}
          >
            <Button>Configure Feedback Form</Button>
          </Link>
        </div>
      </div>

      {/* New Feedback ID created */}
      {newFeedbackId && (
        <div className="card bg-green-50 border border-green-200">
          <p className="text-green-800 font-medium">✓ Feedback link created!</p>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 bg-white px-3 py-2 rounded text-sm break-all">
              {baseUrl}/feedback/{newFeedbackId}
            </code>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${baseUrl}/feedback/${newFeedbackId}`,
                )
              }
            >
              Copy
            </Button>
          </div>
        </div>
      )}

      {/* Create Request Section */}
      <div className="card">
        {!showCreateForm ? (
          <Button onClick={() => setShowCreateForm(true)}>
            + Create New Feedback Link
          </Button>
        ) : (
          <div className="space-y-4">
            <CreateFeedbackRequestForm
              enterpriseId={enterprise.id}
              onSuccess={handleRequestCreated}
            />
            <Button
              variant="secondary"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Existing Requests */}
      <div>
        <h2 className="text-lg font-semibold mb-3">
          Feedback Links ({requests.length})
        </h2>
        <FeedbackRequestList requests={requests} baseUrl={baseUrl} />
      </div>
    </div>
  );
}
