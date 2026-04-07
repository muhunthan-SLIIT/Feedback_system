package com.example.feedback.controller

import com.example.feedback.dto.request.CreateFeedbackRequestDto
import com.example.feedback.model.FeedbackRequest
import com.example.feedback.service.FeedbackRequestService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin/enterprises")
class AdminFeedbackRequestController(
    private val feedbackRequestService: FeedbackRequestService
) {
    
    @GetMapping("/{enterpriseId}/feedback-requests")
    fun listFeedbackRequests(@PathVariable enterpriseId: String): ResponseEntity<List<FeedbackRequest>> {
        return ResponseEntity.ok(feedbackRequestService.getFeedbackRequestsByEnterprise(enterpriseId))
    }
    
    @PostMapping("/{enterpriseId}/feedback-requests")
    fun createFeedbackRequest(
        @PathVariable enterpriseId: String,
        @RequestBody @Valid dto: CreateFeedbackRequestDto
    ): ResponseEntity<FeedbackRequest> {
        val created = feedbackRequestService.createFeedbackRequest(enterpriseId, dto)
        return ResponseEntity.ok(created)
    }
    
    @GetMapping("/feedback-requests/{feedbackId}")
    fun getFeedbackRequest(@PathVariable feedbackId: String): ResponseEntity<FeedbackRequest> {
        return ResponseEntity.ok(feedbackRequestService.getFeedbackRequestById(feedbackId))
    }
}