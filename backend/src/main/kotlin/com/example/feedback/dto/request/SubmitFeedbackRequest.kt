package com.example.feedback.dto.request

import jakarta.validation.constraints.*

data class SubmitFeedbackRequest(
    @field:Min(value = 1, message = "rating must be at least 1")
    @field:Max(value = 5, message = "rating must be at most 5")
    val rating: Int
)