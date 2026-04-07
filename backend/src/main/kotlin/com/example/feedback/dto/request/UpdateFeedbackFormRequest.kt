package com.example.feedback.dto.request

import jakarta.validation.constraints.*

data class UpdateFeedbackFormRequest(
    @field:NotBlank(message = "headerText is required")
    @field:Size(max = 80, message = "headerText must be at most 80 characters")
    val headerText: String,
    
    @field:NotBlank(message = "headerDescription is required")
    @field:Size(max = 200, message = "headerDescription must be at most 200 characters")
    val headerDescription: String,
    
    @field:NotBlank(message = "footerText is required")
    @field:Size(max = 120, message = "footerText must be at most 120 characters")
    val footerText: String,
    
    @field:Size(min = 5, max = 5, message = "ratingLabels must contain exactly 5 items")
    val ratingLabels: List<String>,
    
    @field:NotBlank(message = "thankYouText is required")
    @field:Size(max = 120, message = "thankYouText must be at most 120 characters")
    val thankYouText: String,
    
    @field:NotBlank(message = "invalidReplyText is required")
    @field:Size(max = 120, message = "invalidReplyText must be at most 120 characters")
    val invalidReplyText: String,
    
    @field:NotBlank(message = "expiredReplyText is required")
    @field:Size(max = 120, message = "expiredReplyText must be at most 120 characters")
    val expiredReplyText: String,
    
    val skipForChannels: List<String> = emptyList()
)