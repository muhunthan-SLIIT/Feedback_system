package com.example.feedback.dto.response

data class FeedbackFormResponse(
    val headerText: String,
    val headerDescription: String,
    val footerText: String,
    val ratingLabels: List<String>,
    val thankYouText: String,
    val invalidReplyText: String,
    val expiredReplyText: String,
    val skipForChannels: List<String>
)