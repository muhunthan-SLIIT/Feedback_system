package com.example.feedback.controller

import com.example.feedback.service.DemoDataService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/dev")
class DemoController(
    private val demoDataService: DemoDataService
) {
    
    /**
     * Resets the database and seeds it with demo data.
     * Useful for testing and demonstrations.
     */
    @PostMapping("/demo/reset")
    fun resetDemoData(): ResponseEntity<Map<String, String>> {
        demoDataService.resetDemoData()
        return ResponseEntity.ok(mapOf("message" to "Demo data reset successfully"))
    }
}