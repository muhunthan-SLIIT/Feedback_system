package com.example.feedback.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field

@Document(collection = "enterprises")
data class Enterprise(
    @Id
    val id: String? = null,
    
    @Field("name")
    val name: String,
    
    @Field("createdAt")
    val createdAt: String = java.time.Instant.now().toString()
)