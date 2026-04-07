package com.example.feedback.dto.request

import jakarta.validation.constraints.NotBlank
import java.time.Instant

data class CreateFeedbackRequestDto(
    @field:NotBlank(message = "Session ID is required")
    val sessionId: String,
    
    // Expires in hours from now (e.g., 24 = expires in 1 day)
    val expiresHours: Long = 24,
    
    // Optional: custom feedbackId, if not provided we generate one
    val feedbackId: String? = null
) {
    fun calculateExpiresAt(): String {
        return Instant.now().plusSeconds(expiresHours * 3600).toString()
    }
}