package com.example.feedback.exception

class FeedbackNotFoundException(message: String) : RuntimeException(message)
class FeedbackExpiredException(message: String) : RuntimeException(message)
class FeedbackAlreadySubmittedException(message: String) : RuntimeException(message)
class InvalidChannelException(message: String) : RuntimeException(message)