package com.example.feedback.repository

import com.example.feedback.model.FeedbackRequest
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface FeedbackRequestRepository : MongoRepository<FeedbackRequest, String> {
    fun findByFeedbackId(feedbackId: String): FeedbackRequest?
    
    // NEW: Find all requests for an enterprise
    fun findByEnterpriseId(enterpriseId: String): List<FeedbackRequest>
}