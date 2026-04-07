package com.example.feedback.dto.response

data class PublicFeedbackDataResponse(
    val feedbackId: String,
    val enterpriseName: String,
    val headerText: String,
    val headerDescription: String,
    val footerText: String,
    val ratingLabels: List<String>,
    val isExpired: Boolean,
    val isAlreadySubmitted: Boolean
)