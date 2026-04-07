package com.example.feedback.dto.request

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class CreateEnterpriseRequest(
    @field:NotBlank(message = "Enterprise name is required")
    @field:Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    val name: String
)