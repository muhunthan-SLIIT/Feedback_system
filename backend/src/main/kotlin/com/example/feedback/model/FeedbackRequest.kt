package com.example.feedback.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.time.Instant

@Document(collection = "feedback_requests")
data class FeedbackRequest(
    @Id
    val id: String? = null,
    
    @Field("feedbackId")
    val feedbackId: String,
    
    @Field("enterpriseId")
    val enterpriseId: String,
    
    @Field("sessionId")
    val sessionId: String,
    
    @Field("expiresAt")
    val expiresAt: String,
    
    @Field("submitted")
    val submitted: Boolean = false,
    
    @Field("submittedAt")
    val submittedAt: String? = null,
    
    @Field("rating")
    val rating: Int? = null,
    
    @Field("createdAt")
    val createdAt: String = Instant.now().toString()
)