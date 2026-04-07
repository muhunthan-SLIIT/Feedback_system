package com.example.feedback.repository

import com.example.feedback.model.SessionFeedbackFormConfig
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface FeedbackFormConfigRepository : MongoRepository<SessionFeedbackFormConfig, String> {
    fun findByEnterpriseId(enterpriseId: String): SessionFeedbackFormConfig?
}