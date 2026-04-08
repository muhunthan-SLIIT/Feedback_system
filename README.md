# Chat Session Feedback System

A web application for collecting feedback on chat sessions. Enterprises can create feedback requests, and users can submit feedback through customizable forms.

## Features

- **Admin Dashboard**: Create and manage feedback requests for enterprises
- **Customizable Feedback Forms**: Configure questions, ratings, and text inputs
- **Public Feedback Submission**: Secure, one-time use feedback links
- **Enterprise Management**: Organize feedback by enterprise

## Setup Steps

### Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- MongoDB (local or Atlas)
- Gradle (for backend)

### 1. Clone the Repository

```bash
git clone https://github.com/muhunthan-SLIIT/Feedback_system.git
cd chat-feedback
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Configure environment variables in `.env`:

```
MONGODB_URI=mongodb://localhost:27017/feedback
# or use MongoDB Atlas URI
```

Install dependencies and run:

```bash
./gradlew build
./gradlew bootRun
```

The backend will start on http://localhost:8080

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
# or with pnpm
pnpm install
```

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

The frontend will be available at http://localhost:3000

## How to Run Backend

From the `backend` directory:

```bash
./gradlew bootRun
```

Or on Windows:

```bash
gradlew.bat bootRun
```

## How to Run Frontend

From the `frontend` directory:

```bash
npm run dev
```

## How to Run Tests

Currently, there are no automated tests implemented in this project. To run tests in the future:

### Backend Tests

```bash
cd backend
./gradlew test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## Assumptions Made

- MongoDB is used as the database (configured via environment variables)
- Frontend communicates with backend via REST API on localhost:8080
- Feedback requests are enterprise-specific
- Feedback links are one-time use only
- Basic authentication is not implemented (admin access assumed)

## Sample API Usage

### Get Public Feedback Form

```bash
GET /api/public/feedback/{feedbackId}
```

Response:
```json
{
  "feedbackId": "abc123",
  "questions": [
    {
      "id": "rating",
      "type": "rating",
      "question": "How would you rate the chat session?",
      "required": true
    },
    {
      "id": "comments",
      "type": "text",
      "question": "Any additional comments?",
      "required": false
    }
  ]
}
```

### Submit Feedback

```bash
POST /api/public/feedback/{feedbackId}/respond
Content-Type: application/json

{
  "responses": {
    "rating": 5,
    "comments": "Great support!"
  }
}
```

### Admin: Create Feedback Request

```bash
POST /api/admin/enterprises/{enterpriseId}/feedback-requests
Content-Type: application/json

{
  "title": "Customer Support Session",
  "description": "Feedback for recent support chat",
  "expiresAt": "2024-12-31T23:59:59Z"
}
```

### Admin: Get Feedback Form Config

```bash
GET /api/admin/enterprises/{enterpriseId}/session-feedback-form
```</content>
<parameter name="filePath">C:\Users\Muhun\OneDrive\Desktop\chat-feedback\README.md