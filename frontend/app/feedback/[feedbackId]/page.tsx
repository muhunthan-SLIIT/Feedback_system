"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { publicApi } from "@/lib/api";
import { PublicFeedbackData } from "@/lib/types";
import { FeedbackForm } from "@/components/public/FeedbackForm";
import { FeedbackSuccess } from "@/components/public/FeedbackSuccess";
import { FeedbackExpired } from "@/components/public/FeedbackExpired";
import { FeedbackAlreadyUsed } from "@/components/public/FeedbackAlreadyUsed";
import { FeedbackNotFound } from "@/components/public/FeedbackNotFound";
import { FeedbackInvalid } from "@/components/public/FeedbackInvalid";

type PageState =
  | "loading"
  | "form"
  | "success"
  | "expired"
  | "alreadyUsed"
  | "notFound"
  | "invalid";

export default function PublicFeedbackPage() {
  const params = useParams();
  const feedbackId = params.feedbackId as string;
  const [state, setState] = useState<PageState>("loading");
  const [feedbackData, setFeedbackData] = useState<PublicFeedbackData | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await publicApi.getFeedbackData(feedbackId);
        setFeedbackData(data);
        if (data.isExpired) setState("expired");
        else if (data.isAlreadySubmitted) setState("alreadyUsed");
        else setState("form");
      } catch (err: any) {
        if (err.status === 404) setState("notFound");
        else if (err.status === 410) {
          setState("expired");
          setErrorMessage(err.message || "Expired");
        } else if (err.status === 409) {
          setState("alreadyUsed");
          setErrorMessage(err.message || "Already submitted");
        } else if (err.status === 400) {
          setState("invalid");
          setErrorMessage(err.message || "Invalid");
        } else {
          setState("invalid");
          setErrorMessage(err.message || "Failed to load");
        }
      }
    };
    loadData();
  }, [feedbackId]);

  const handleSubmit = async (rating: number) => {
    try {
      const response = await publicApi.submitFeedback(feedbackId, rating);
      setSuccessMessage(response.message);
      setState("success");
    } catch (err: any) {
      if (err.status === 410) {
        setState("expired");
        setErrorMessage(err.message || "Expired");
      } else if (err.status === 409) {
        setState("alreadyUsed");
        setErrorMessage(err.message || "Already submitted");
      } else throw err;
    }
  };

  if (state === "loading")
    return <div className="text-center py-8">Loading...</div>;
  if (state === "notFound") return <FeedbackNotFound />;
  if (state === "expired")
    return (
      <FeedbackExpired
        message={errorMessage || "This feedback request has expired."}
      />
    );
  if (state === "alreadyUsed")
    return (
      <FeedbackAlreadyUsed
        message={errorMessage || "You have already submitted feedback."}
      />
    );
  if (state === "invalid")
    return (
      <FeedbackInvalid
        message={errorMessage || "This feedback request is invalid."}
      />
    );
  if (state === "success") return <FeedbackSuccess message={successMessage} />;
  if (state === "form" && feedbackData)
    return <FeedbackForm feedbackData={feedbackData} onSubmit={handleSubmit} />;
  return <FeedbackNotFound />;
}
