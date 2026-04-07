package com.example.feedback.service

import com.example.feedback.dto.request.CreateFeedbackRequestDto
import com.example.feedback.exception.FeedbackNotFoundException
import com.example.feedback.model.FeedbackRequest
import com.example.feedback.repository.FeedbackRequestRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
class FeedbackRequestService(
    private val feedbackRequestRepository: FeedbackRequestRepository
) {
    
    fun getFeedbackRequestsByEnterprise(enterpriseId: String): List<FeedbackRequest> {
        return feedbackRequestRepository.findByEnterpriseId(enterpriseId)
    }
    
    fun getFeedbackRequestById(feedbackId: String): FeedbackRequest {
        return feedbackRequestRepository.findByFeedbackId(feedbackId)
            ?: throw FeedbackNotFoundException("Feedback request not found: $feedbackId")
    }
    
    @Transactional
    fun createFeedbackRequest(enterpriseId: String, dto: CreateFeedbackRequestDto): FeedbackRequest {
        // Generate unique feedbackId if not provided
        val feedbackId = dto.feedbackId?.takeIf { it.isNotBlank() } 
            ?: "fb-${UUID.randomUUID().toString().take(12)}"
        
        // Check for duplicate feedbackId
        if (feedbackRequestRepository.findByFeedbackId(feedbackId) != null) {
            throw IllegalArgumentException("Feedback ID '$feedbackId' already exists")
        }
        
        val request = FeedbackRequest(
            feedbackId = feedbackId,
            enterpriseId = enterpriseId,
            sessionId = dto.sessionId.trim(),
            expiresAt = dto.calculateExpiresAt(),
            submitted = false
        )
        
        return feedbackRequestRepository.save(request)
    }
}