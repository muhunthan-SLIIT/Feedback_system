package com.example.feedback.service

import com.example.feedback.dto.request.CreateEnterpriseRequest
import com.example.feedback.exception.FeedbackNotFoundException
import com.example.feedback.model.Enterprise
import com.example.feedback.repository.EnterpriseRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
class EnterpriseService(
    private val enterpriseRepository: EnterpriseRepository
) {
    
    fun getAllEnterprises(): List<Enterprise> {
        return enterpriseRepository.findAll()
    }
    
    fun getEnterpriseById(enterpriseId: String): Enterprise {
        return enterpriseRepository.findById(enterpriseId)
            .orElseThrow { FeedbackNotFoundException("Enterprise not found: $enterpriseId") }
    }
    
    @Transactional
    fun createEnterprise(request: CreateEnterpriseRequest): Enterprise {
        val enterprise = Enterprise(
            name = request.name.trim()
        )
        return enterpriseRepository.save(enterprise)
    }
}