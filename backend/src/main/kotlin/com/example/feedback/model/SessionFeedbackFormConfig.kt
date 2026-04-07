package com.example.feedback.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field

@Document(collection = "feedback_form_configs")
data class SessionFeedbackFormConfig(
    @Id
    val id: String? = null,
    
    @Field("enterpriseId")
    val enterpriseId: String,
    
    @Field("headerText")
    val headerText: String,
    
    @Field("headerDescription")
    val headerDescription: String,
    
    @Field("footerText")
    val footerText: String,
    
    @Field("ratingLabels")
    val ratingLabels: List<String>,
    
    @Field("thankYouText")
    val thankYouText: String,
    
    @Field("invalidReplyText")
    val invalidReplyText: String,
    
    @Field("expiredReplyText")
    val expiredReplyText: String,
    
    @Field("skipForChannels")
    val skipForChannels: List<String> = emptyList(),
    
    @Field("updatedAt")
    val updatedAt: String = java.time.Instant.now().toString()
) {
    companion object {
        val VALID_CHANNELS = setOf("WhatsApp", "Instagram", "Messenger", "WebChat")
    }
}