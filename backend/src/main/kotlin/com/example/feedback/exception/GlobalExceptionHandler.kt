package com.example.feedback.exception

import com.example.feedback.dto.response.ErrorResponse
import org.springframework.http.ResponseEntity
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.http.HttpStatus

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationExceptions(ex: MethodArgumentNotValidException): ResponseEntity<ErrorResponse> {
        // Explicitly type the map to avoid inference issues
        val errors: Map<String, String> = ex.bindingResult.allErrors
            .filterIsInstance<FieldError>()
            .associate { it.field to (it.defaultMessage ?: "Invalid value") }

        val response = ErrorResponse(
            error = "validation_error",
            message = "Request validation failed",
            details = errors,
            status = HttpStatus.BAD_REQUEST.value()
        )
        return ResponseEntity.badRequest().body(response)
    }

    @ExceptionHandler(FeedbackNotFoundException::class)
    fun handleNotFound(ex: FeedbackNotFoundException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            error = "not_found",
            message = ex.message ?: "Resource not found",
            status = HttpStatus.NOT_FOUND.value()
        )
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response)
    }

    @ExceptionHandler(FeedbackExpiredException::class)
    fun handleExpired(ex: FeedbackExpiredException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            error = "expired",
            message = ex.message ?: "Feedback request has expired",
            status = HttpStatus.GONE.value()
        )
        return ResponseEntity.status(HttpStatus.GONE).body(response)
    }

    @ExceptionHandler(FeedbackAlreadySubmittedException::class)
    fun handleAlreadySubmitted(ex: FeedbackAlreadySubmittedException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            error = "already_submitted",
            message = ex.message ?: "Feedback already submitted",
            status = HttpStatus.CONFLICT.value()
        )
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response)
    }

    @ExceptionHandler(InvalidChannelException::class)
    fun handleInvalidChannel(ex: InvalidChannelException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            error = "validation_error",
            message = ex.message ?: "Invalid channel value",
            status = HttpStatus.BAD_REQUEST.value()
        )
        return ResponseEntity.badRequest().body(response)
    }

    @ExceptionHandler(Exception::class)
    fun handleGeneric(ex: Exception): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            error = "internal_error",
            message = ex.message ?: "An unexpected error occurred",
            status = HttpStatus.INTERNAL_SERVER_ERROR.value()
        )
        return ResponseEntity.internalServerError().body(response)
    }
}