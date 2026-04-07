package com.example.feedback.service

import com.example.feedback.model.Enterprise
import com.example.feedback.model.FeedbackRequest
import com.example.feedback.model.SessionFeedbackFormConfig
import com.example.feedback.repository.EnterpriseRepository
import com.example.feedback.repository.FeedbackFormConfigRepository
import com.example.feedback.repository.FeedbackRequestRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant

@Service
class DemoDataService(
    private val enterpriseRepository: EnterpriseRepository,
    private val feedbackFormConfigRepository: FeedbackFormConfigRepository,
    private val feedbackRequestRepository: FeedbackRequestRepository
) {
    
    @Transactional
    fun resetDemoData() {
        feedbackRequestRepository.deleteAll()
        feedbackFormConfigRepository.deleteAll()
        enterpriseRepository.deleteAll()
        
        val enterprise = Enterprise(name = "Demo Enterprise")
        val savedEnterprise = enterpriseRepository.save(enterprise)
        val enterpriseId = savedEnterprise.id!!
        
        val config = SessionFeedbackFormConfig(
            enterpriseId = enterpriseId,
            headerText = "How was your chat experience?",
            headerDescription = "Please rate your recent conversation with our support team.",
            footerText = "Your feedback helps us improve.",
            ratingLabels = listOf("Very Poor", "Poor", "Okay", "Good", "Excellent"),
            thankYouText = "Thank you! We appreciate your feedback.",
            invalidReplyText = "This feedback link is no longer valid.",
            expiredReplyText = "Sorry, this feedback request has expired.",
            skipForChannels = listOf("WhatsApp", "WebChat")
        )
        feedbackFormConfigRepository.save(config)
        
        feedbackRequestRepository.save(FeedbackRequest(
            feedbackId = "valid-feedback-001",
            enterpriseId = enterpriseId,
            sessionId = "session-valid-001",
            expiresAt = Instant.now().plusSeconds(86400).toString(),
            submitted = false
        ))
        
        feedbackRequestRepository.save(FeedbackRequest(
            feedbackId = "expired-feedback-001",
            enterpriseId = enterpriseId,
            sessionId = "session-expired-001",
            expiresAt = Instant.now().minusSeconds(3600).toString(),
            submitted = false
        ))
        
        feedbackRequestRepository.save(FeedbackRequest(
            feedbackId = "used-feedback-001",
            enterpriseId = enterpriseId,
            sessionId = "session-used-001",
            expiresAt = Instant.now().plusSeconds(86400).toString(),
            submitted = true,
            submittedAt = Instant.now().toString(),
            rating = 4
        ))
    }
}