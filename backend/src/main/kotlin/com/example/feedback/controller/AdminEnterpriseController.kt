package com.example.feedback.controller

import com.example.feedback.dto.request.CreateEnterpriseRequest
import com.example.feedback.model.Enterprise
import com.example.feedback.service.EnterpriseService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin/enterprises")
class AdminEnterpriseController(
    private val enterpriseService: EnterpriseService
) {
    
    @GetMapping
    fun listEnterprises(): ResponseEntity<List<Enterprise>> {
        return ResponseEntity.ok(enterpriseService.getAllEnterprises())
    }
    
    @GetMapping("/{enterpriseId}")
    fun getEnterprise(@PathVariable enterpriseId: String): ResponseEntity<Enterprise> {
        return ResponseEntity.ok(enterpriseService.getEnterpriseById(enterpriseId))
    }
    
    @PostMapping
    fun createEnterprise(@RequestBody @Valid request: CreateEnterpriseRequest): ResponseEntity<Enterprise> {
        val created = enterpriseService.createEnterprise(request)
        return ResponseEntity.ok(created)
    }
}