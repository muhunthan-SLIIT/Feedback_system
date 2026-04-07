package com.example.feedback.repository

import com.example.feedback.model.Enterprise
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface EnterpriseRepository : MongoRepository<Enterprise, String> {

}