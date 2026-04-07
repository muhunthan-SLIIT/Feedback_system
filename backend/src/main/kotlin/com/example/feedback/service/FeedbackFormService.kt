package com.example.feedback.service

import com.example.feedback.dto.request.SubmitFeedbackRequest
import com.example.feedback.dto.request.UpdateFeedbackFormRequest
import com.example.feedback.dto.response.FeedbackFormResponse
import com.example.feedback.dto.response.FeedbackSubmitResponse
import com.example.feedback.dto.response.PublicFeedbackDataResponse
import com.example.feedback.exception.*
import com.example.feedback.model.SessionFeedbackFormConfig
import com.example.feedback.repository.EnterpriseRepository
import com.example.feedback.repository.FeedbackFormConfigRepository
import com.example.feedback.repository.FeedbackRequestRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant

@Service
class FeedbackFormService(
    private val enterpriseRepository: EnterpriseRepository,
    private val feedbackFormConfigRepository: FeedbackFormConfigRepository,
    private val feedbackRequestRepository: FeedbackRequestRepository
) {

    fun getFeedbackFormConfig(enterpriseId: String): FeedbackFormResponse {
        val enterprise = enterpriseRepository.findById(enterpriseId).orElse(null)
            ?: throw FeedbackNotFoundException("Enterprise not found: $enterpriseId")

        val config = feedbackFormConfigRepository.findByEnterpriseId(enterpriseId)
            ?: throw FeedbackNotFoundException("Feedback form config not found for enterprise: $enterpriseId")

        return config.toResponse()
    }

    @Transactional
    fun updateFeedbackFormConfig(enterpriseId: String, request: UpdateFeedbackFormRequest): FeedbackFormResponse {
        val enterprise = enterpriseRepository.findById(enterpriseId).orElse(null)
            ?: throw FeedbackNotFoundException("Enterprise not found: $enterpriseId")

        // Validate rating labels
        if (request.ratingLabels.size != 5) {
            throw IllegalArgumentException("ratingLabels must contain exactly 5 items")
        }
        request.ratingLabels.forEachIndexed { index, label ->
            if (label.isBlank() || label.length > 24) {
                throw IllegalArgumentException("Rating label at index $index must be non-empty and at most 24 characters")
            }
        }

        // Validate skipForChannels
        val validChannels = SessionFeedbackFormConfig.VALID_CHANNELS
        request.skipForChannels.forEach { channel ->
            if (channel !in validChannels) {
                throw InvalidChannelException("Invalid channel: $channel. Allowed: ${validChannels.joinToString()}")
            }
        }
        if (request.skipForChannels.distinct().size != request.skipForChannels.size) {
            throw InvalidChannelException("skipForChannels must not contain duplicates")
        }

        val config = SessionFeedbackFormConfig(
            enterpriseId = enterpriseId,
            headerText = request.headerText,
            headerDescription = request.headerDescription,
            footerText = request.footerText,
            ratingLabels = request.ratingLabels,
            thankYouText = request.thankYouText,
            invalidReplyText = request.invalidReplyText,
            expiredReplyText = request.expiredReplyText,
            skipForChannels = request.skipForChannels
        )

        val existing = feedbackFormConfigRepository.findByEnterpriseId(enterpriseId)
        return if (existing != null) {
            val updated = config.copy(id = existing.id)
            feedbackFormConfigRepository.save(updated).toResponse()
        } else {
            feedbackFormConfigRepository.save(config).toResponse()
        }
    }

    fun getPublicFeedbackData(feedbackId: String): PublicFeedbackDataResponse {
        val request = feedbackRequestRepository.findByFeedbackId(feedbackId)
            ?: throw FeedbackNotFoundException("Feedback request not found: $feedbackId")

        val enterprise = enterpriseRepository.findById(request.enterpriseId).orElse(null)
            ?: throw FeedbackNotFoundException("Enterprise not found: ${request.enterpriseId}")

        val config = feedbackFormConfigRepository.findByEnterpriseId(request.enterpriseId)
            ?: throw FeedbackNotFoundException("Feedback form config not found")

        val isExpired = Instant.parse(request.expiresAt).isBefore(Instant.now())

        return PublicFeedbackDataResponse(
            feedbackId = feedbackId,
            enterpriseName = enterprise.name,
            headerText = config.headerText,
            headerDescription = config.headerDescription,
            footerText = config.footerText,
            ratingLabels = config.ratingLabels,
            isExpired = isExpired,
            isAlreadySubmitted = request.submitted
        )
    }

    @Transactional
    fun submitFeedback(feedbackId: String, request: SubmitFeedbackRequest): FeedbackSubmitResponse {
        val feedbackRequest = feedbackRequestRepository.findByFeedbackId(feedbackId)
            ?: throw FeedbackNotFoundException("Feedback request not found: $feedbackId")

        if (feedbackRequest.submitted) {
            throw FeedbackAlreadySubmittedException("Feedback already submitted for this request")
        }

        val expiresAt = Instant.parse(feedbackRequest.expiresAt)
        if (expiresAt.isBefore(Instant.now())) {
            throw FeedbackExpiredException("Feedback request has expired")
        }

        if (request.rating !in 1..5) {
            throw IllegalArgumentException("Rating must be between 1 and 5")
        }

        val updated = feedbackRequest.copy(
            submitted = true,
            submittedAt = Instant.now().toString(),
            rating = request.rating
        )
        feedbackRequestRepository.save(updated)

        val config = feedbackFormConfigRepository.findByEnterpriseId(feedbackRequest.enterpriseId)
        val thankYouMessage = config?.thankYouText ?: "Thank you for your feedback!"

        return FeedbackSubmitResponse(
            success = true,
            message = thankYouMessage
        )
    }
}

private fun SessionFeedbackFormConfig.toResponse(): FeedbackFormResponse {
    return FeedbackFormResponse(
        headerText = this.headerText,
        headerDescription = this.headerDescription,
        footerText = this.footerText,
        ratingLabels = this.ratingLabels,
        thankYouText = this.thankYouText,
        invalidReplyText = this.invalidReplyText,
        expiredReplyText = this.expiredReplyText,
        skipForChannels = this.skipForChannels
    )
}