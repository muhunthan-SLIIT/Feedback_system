package com.example.feedback.controller

import com.example.feedback.dto.request.SubmitFeedbackRequest
import com.example.feedback.dto.response.FeedbackSubmitResponse
import com.example.feedback.dto.response.PublicFeedbackDataResponse
import com.example.feedback.service.FeedbackFormService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/public")
class PublicFeedbackController(
    private val feedbackFormService: FeedbackFormService
) {
    
    @GetMapping("/feedback/{feedbackId}")
    fun getPublicFeedbackData(@PathVariable feedbackId: String): ResponseEntity<PublicFeedbackDataResponse> {
        val response = feedbackFormService.getPublicFeedbackData(feedbackId)
        return ResponseEntity.ok(response)
    }
    
    @PostMapping("/feedback/{feedbackId}/respond")
    fun submitFeedback(
        @PathVariable feedbackId: String,
        @RequestBody @Valid request: SubmitFeedbackRequest
    ): ResponseEntity<FeedbackSubmitResponse> {
        val response = feedbackFormService.submitFeedback(feedbackId, request)
        return ResponseEntity.ok(response)
    }
}