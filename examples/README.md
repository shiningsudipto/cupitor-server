# Cupitor Server - API Documentation

Complete API documentation organized by modules. Each module has its own detailed documentation file.

## 📚 Documentation Structure

### Core Modules

- **[Authentication](./auth.md)** - User registration and login
- **[Admin](./admin.md)** - Admin management with role-based access control
- **[Candidate](./candidate.md)** - Candidate/job seeker profiles
- **[Company](./company.md)** - Company profiles and management

### Job Management

- **[Job](./job.md)** - Job postings and listings
- **[Application](./application.md)** - Job applications with resume uploads
- **[Saved Job](./savedJob.md)** - Save jobs for later
- **[ShortList](./shortList.md)** - Company shortlisting candidates

### Candidate Features

- **[Candidate Experience](./candidateExperience.md)** - Work experience records
- **[Resume](./resume.md)** - Resume file management
- **[Resume Analysis](./resumeAnalysis.md)** - AI-powered resume analysis and ATS scoring

### Engagement

- **[Review](./review.md)** - Company reviews and ratings
- **[Notification](./notification.md)** - User notifications system

## 🚀 Quick Start

### 1. Base URL

```
http://localhost:5000/api
```

### 2. Common Response Format

**Success Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    /* returned data */
  }
}
```

**Error Response:**

```json
{
  "statusCode": 400,
  "success": false,
  "message": "Error message describing what went wrong",
  "error": {
    /* error details */
  }
}
```

### 3. Authentication

Most endpoints require authentication. After logging in, include the JWT token in requests:

```
Authorization: Bearer {your-jwt-token}
```

## 📋 Complete Workflow Example

### Step 1: Register a Company

```bash
POST /api/auth/register/company
Content-Type: application/json

{
  "name": "TechCorp Solutions",
  "email": "contact@techcorp.com",
  "username": "techcorp",
  "companyType": "{{companyTypeId}}",
  "location": "San Francisco, CA",
  "employee_len": "100-500",
  "password": "CompanyPass123!"
}
```

### Step 2: Register a Candidate

```bash
POST /api/auth/register/candidate
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890",
  "city": "New York",
  "skills": ["JavaScript", "React", "Node.js"],
  "education": "BS Computer Science"
}
```

### Step 3: Company Posts a Job

```bash
POST /api/job
Authorization: Bearer {company_token}
Content-Type: application/json

{
  "companyId": "{{companyId}}",
  "jobType": "{{jobTypeId}}",
  "title": "Senior Full Stack Developer",
  "description": "We are looking for an experienced developer...",
  "requirements": "5+ years experience",
  "experience_level": "Mid-Senior Level",
  "salaryRange": "$100,000 - $150,000",
  "skills": ["React", "Node.js", "TypeScript"],
  "deadline": "2024-12-31"
}
```

### Step 4: Candidate Uploads & Analyzes Resume

```bash
POST /api/resumeAnalysis/analyze
Content-Type: multipart/form-data

candidateId: {{candidateId}}
resume: [file.pdf]
```

### Step 5: Candidate Applies to Job

```bash
POST /api/application
Content-Type: multipart/form-data

jobId: {{jobId}}
candidateId: {{candidateId}}
coverLetter: "Dear Hiring Manager..."
resume: [file.pdf]
```

### Step 6: Company Shortlists Candidate

```bash
POST /api/shortList
Authorization: Bearer {company_token}
Content-Type: application/json

{
  "jobId": "{{jobId}}",
  "companyId": "{{companyId}}",
  "candidateId": "{{candidateId}}"
}
```

### Step 7: Candidate Reviews Company

```bash
POST /api/review
Authorization: Bearer {candidate_token}
Content-Type: application/json

{
  "companyId": "{{companyId}}",
  "candidateId": "{{candidateId}}",
  "rating": 5,
  "comment": "Great company to work with!"
}
```

## 🔐 Admin Setup

See [Admin Setup Guide](./ADMIN_SETUP.md) for detailed instructions on:

- Creating the initial super admin
- Setting up admin roles
- Managing admin accounts

## 💡 Testing Tips

1. **Use Postman or Thunder Client** to test endpoints
2. **Save IDs** from responses to use in subsequent requests
3. **For file uploads**, use `multipart/form-data` content type
4. **Replace placeholder IDs** (like `{{companyId}}`) with actual IDs
5. **Include auth tokens** for protected routes

## 📖 Module Details

Click on any module link above to see:

- Complete route listing
- Request/response examples
- Field descriptions
- Validation rules
- Usage examples
