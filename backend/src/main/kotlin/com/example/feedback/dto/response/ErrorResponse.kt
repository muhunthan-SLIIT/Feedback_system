package com.example.feedback.dto.response

data class ErrorResponse(
    val error: String,
    val message: String,
    val details: Map<String, String>? = null,
    val status: Int
)