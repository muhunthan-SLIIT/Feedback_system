# Project Decisions

## What I Prioritized

1. **Core Functionality**: Implemented the essential feedback collection workflow - creating requests, public submission, and admin management.

2. **Technology Stack**: Chose modern, scalable technologies:
   - Next.js for frontend (React framework with SSR)
   - Kotlin Spring Boot for backend (type-safe, JVM-based)
   - MongoDB for data storage (flexible document model)
   - TypeScript for type safety in frontend

3. **User Experience**: Focused on clean UI with Tailwind CSS and responsive design for both admin and public interfaces.

4. **API Design**: RESTful APIs with proper HTTP methods and status codes.

5. **Data Validation**: Input validation on both frontend and backend.

## Assumptions Made

1. **Single Database**: MongoDB is sufficient for this use case without needing relational features.

2. **No Authentication**: Admin routes are unprotected; assumed to be deployed behind authentication proxy or firewall.

3. **Environment Variables**: Configuration via .env files is acceptable for development/demo purposes.

4. **One-Time Use Links**: Feedback requests can only be submitted once; no editing capability.

5. **Basic Error Handling**: Custom exceptions and global error handling implemented, but not extensive logging/monitoring.

6. **No File Uploads**: Feedback forms are limited to text, ratings, and basic inputs.

## What I Intentionally Left Out

1. **Authentication & Authorization**: No user login system; admin access assumed secure.

2. **Automated Testing**: No unit, integration, or end-to-end tests implemented.

3. **Deployment Configuration**: No Docker, CI/CD pipelines, or cloud deployment setup.

4. **Email Notifications**: No system for sending feedback request emails or reminders.

5. **Analytics/Dashboard**: No reporting or analytics on feedback data.

6. **Multi-tenancy**: Basic enterprise separation but no advanced tenant isolation.

7. **Caching**: No Redis or in-memory caching for performance.

8. **API Documentation**: No Swagger/OpenAPI documentation.

9. **Internationalization**: Only English language support.

10. **Backup/Recovery**: No database backup strategies.

## What I Would Do Next With Another Half Day

1. **Add Authentication**: Implement JWT-based auth for admin routes using Spring Security.

2. **Write Tests**: Add unit tests for services and controllers, integration tests for API endpoints.

3. **Add Email Integration**: Use SendGrid or similar to send feedback request links via email.

4. **Implement Analytics**: Create admin dashboard with feedback statistics and charts.

5. **Add More Question Types**: Support for multiple choice, checkboxes, file uploads.

6. **Improve Error Handling**: Add comprehensive logging with structured logs.

7. **Add API Documentation**: Generate Swagger docs for all endpoints.

8. **Implement Feedback Editing**: Allow users to update their feedback within a time window.

9. **Add Rate Limiting**: Prevent abuse with request rate limiting.

10. **Set Up CI/CD**: Basic GitHub Actions workflow for automated testing and deployment.</content>
<parameter name="filePath">C:\Users\Muhun\OneDrive\Desktop\chat-feedback\DECISIONS.md