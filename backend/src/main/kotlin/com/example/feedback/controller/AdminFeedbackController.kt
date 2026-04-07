package com.example.feedback.controller

import com.example.feedback.dto.request.UpdateFeedbackFormRequest
import com.example.feedback.dto.response.FeedbackFormResponse
import com.example.feedback.service.FeedbackFormService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin/enterprises")
class AdminFeedbackController(
    private val feedbackFormService: FeedbackFormService
) {
    
    @GetMapping("/{enterpriseId}/session-feedback-form")
    fun getFeedbackForm(@PathVariable enterpriseId: String): ResponseEntity<FeedbackFormResponse> {
        val response = feedbackFormService.getFeedbackFormConfig(enterpriseId)
        return ResponseEntity.ok(response)
    }
    
    @PutMapping("/{enterpriseId}/session-feedback-form")
    fun updateFeedbackForm(
        @PathVariable enterpriseId: String,
        @RequestBody @Valid request: UpdateFeedbackFormRequest
    ): ResponseEntity<FeedbackFormResponse> {
        val response = feedbackFormService.updateFeedbackFormConfig(enterpriseId, request)
        return ResponseEntity.ok(response)
    }
}