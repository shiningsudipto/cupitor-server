# Job Portal API - Routes & Test Data

Complete API documentation with ready-to-use JSON examples for testing all POST requests.

---

## 📋 Table of Contents

1. [Candidate Routes](#1-candidate-routes)
2. [Company Routes](#2-company-routes)
3. [Job Routes](#3-job-routes)
4. [Application Routes](#4-application-routes)
5. [Saved Job Routes](#5-saved-job-routes)
6. [Review Routes](#6-review-routes)
7. [Notification Routes](#7-notification-routes)
8. [Candidate Experience Routes](#8-candidate-experience-routes)
9. [Resume Routes](#9-resume-routes)
10. [ShortList Routes](#10-shortlist-routes)
11. [Resume Analysis Routes](#11-resume-analysis-routes)

---

## 1. Candidate Routes

**Base Path:** `/candidate`

### All Routes

```
POST   /candidate              - Create candidate
GET    /candidate              - Get all candidates
GET    /candidate/:id          - Get candidate by ID
GET    /candidate/email/:email - Get candidate by email
PUT    /candidate/:id          - Update candidate
PUT    /candidate/avatar/:id   - Update avatar (multipart/form-data)
DELETE /candidate/:id          - Delete candidate
```

### POST - Create Candidate

**Endpoint:** `POST /candidate`

**JSON Body (Copy & Test):**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890",
  "city": "New York",
  "address": "123 Main Street, Apt 4B",
  "skills": ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB"],
  "education": "Bachelor of Science in Computer Science",
  "yearsOfExperience": "3",
  "github": "https://github.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe"
}
```

**Minimal Required Fields:**

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "password": "SecurePass123!",
  "phone": "+9876543210"
}
```

---

## 2. Company Routes

**Base Path:** `/company`

### All Routes

```
POST   /company         - Create company
GET    /company         - Get all companies
GET    /company/:id     - Get company by ID
GET    /company/:username - Get company by username
PUT    /company/update/:id - Update company (with logo upload)
DELETE /company/:id     - Delete company
```

### POST - Create Company

**Endpoint:** `POST /company`

**JSON Body (Copy & Test):**

```json
{
  "name": "TechCorp Solutions",
  "email": "contact@techcorp.com",
  "username": "techcorp",
  "companyType": "507f1f77bcf86cd799439011",
  "location": "San Francisco, CA",
  "employee_len": "100-500",
  "password": "CompanyPass123!"
}
```

**Note:** Create a CompanyType first, then use its `_id` in the `companyType` field.

### POST - Create Company Type

**Endpoint:** `POST /company` (handled in model)

**JSON Body (Copy & Test):**

```json
{
  "label": "Technology"
}
```

**Other Company Type Examples:**

```json
{ "label": "Healthcare" }
{ "label": "Finance" }
{ "label": "Education" }
{ "label": "E-commerce" }
{ "label": "Manufacturing" }
```

---

## 3. Job Routes

**Base Path:** `/job`

### All Routes

```
POST   /job                  - Create job
GET    /job                  - Get all jobs
GET    /job/:id              - Get job by ID
GET    /job/company/:companyId - Get jobs by company
PUT    /job/:id              - Update job
DELETE /job/:id              - Delete job
```

### POST - Create Job

**Endpoint:** `POST /job`

**JSON Body (Copy & Test):**

```json
{
  "companyId": "507f1f77bcf86cd799439012",
  "jobType": "507f1f77bcf86cd799439014",
  "title": "Senior Full Stack Developer",
  "description": "We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.",
  "requirements": "- 5+ years of experience in web development\n- Strong knowledge of React and Node.js\n- Experience with MongoDB and PostgreSQL\n- Excellent problem-solving skills\n- Bachelor's degree in Computer Science or related field",
  "experience_level": "Mid-Senior Level",
  "salaryRange": "$100,000 - $150,000",
  "skills": [
    "React",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "AWS"
  ],
  "deadline": "2024-12-31"
}
```

**Experience Level Options:**

- "Internship"
- "Entry-Level"
- "Associate"
- "Mid-Senior Level"
- "Director"
- "Executive"

### POST - Create Job Type

**JSON Body (Copy & Test):**

```json
{ "label": "Full-Time" }
```

**Other Job Type Examples:**

```json
{ "label": "Part-Time" }
{ "label": "Contract" }
{ "label": "Internship" }
{ "label": "Freelance" }
{ "label": "Remote" }
```

---

## 4. Application Routes

**Base Path:** `/application`

### All Routes

```
POST   /application                    - Submit application (with resume upload)
GET    /application                    - Get all applications
GET    /application/:id                - Get application by ID
GET    /application/candidate/:candidateId - Get candidate's applications
GET    /application/job/:jobId         - Get job applications
PUT    /application/:id                - Update application
DELETE /application/:id                - Delete application
```

### POST - Create Application

**Endpoint:** `POST /application`

**Content-Type:** `multipart/form-data`

**Form Data:**

- `jobId`: "507f1f77bcf86cd799439015"
- `candidateId`: "507f1f77bcf86cd799439013"
- `coverLetter`: "Dear Hiring Manager, I am writing to express my strong interest..."
- `resume`: [file upload]

**JSON Body (without file):**

```json
{
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013",
  "coverLetter": "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Full Stack Developer position at TechCorp Solutions. With over 5 years of experience in full-stack development and a proven track record of delivering high-quality web applications, I am confident in my ability to contribute to your team.\n\nMy expertise includes:\n- Building scalable applications with React and Node.js\n- Database design and optimization with MongoDB and PostgreSQL\n- Implementing CI/CD pipelines and cloud deployments\n- Leading development teams and mentoring junior developers\n\nI am excited about the opportunity to bring my skills to TechCorp Solutions and help drive innovation in your projects.\n\nThank you for considering my application.\n\nBest regards,\nJohn Doe"
}
```

**Status Options:**

- "pending" (default)
- "reviewed"
- "shortlisted"
- "rejected"
- "accepted"

---

## 5. Saved Job Routes

**Base Path:** `/savedJob`

### All Routes

```
POST   /savedJob                       - Save a job
GET    /savedJob                       - Get all saved jobs
GET    /savedJob/:id                   - Get saved job by ID
GET    /savedJob/candidate/:candidateId - Get candidate's saved jobs
DELETE /savedJob/:id                   - Remove saved job
POST   /savedJob/unsave                - Unsave job by jobId and candidateId
```

### POST - Save Job

**Endpoint:** `POST /savedJob`

**JSON Body (Copy & Test):**

```json
{
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013"
}
```

### POST - Unsave Job

**Endpoint:** `POST /savedJob/unsave`

**JSON Body (Copy & Test):**

```json
{
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013"
}
```

---

## 6. Review Routes

**Base Path:** `/review`

### All Routes

```
POST   /review                      - Create review
GET    /review                      - Get all reviews
GET    /review/:id                  - Get review by ID
GET    /review/company/:companyId   - Get company reviews
GET    /review/candidate/:candidateId - Get candidate reviews
PUT    /review/:id                  - Update review
DELETE /review/:id                  - Delete review
```

### POST - Create Review

**Endpoint:** `POST /review`

**JSON Body (Copy & Test):**

```json
{
  "companyId": "507f1f77bcf86cd799439012",
  "candidateId": "507f1f77bcf86cd799439013",
  "rating": 5,
  "comment": "Great company to work with! The interview process was smooth and professional. The team is very supportive and the work environment is excellent. I highly recommend TechCorp Solutions to other developers."
}
```

**Rating:** Must be between 1-5 (integer)

**More Examples:**

```json
{
  "companyId": "507f1f77bcf86cd799439012",
  "candidateId": "507f1f77bcf86cd799439013",
  "rating": 4,
  "comment": "Good company overall. The work is challenging and the benefits are competitive. Communication could be improved."
}
```

```json
{
  "companyId": "507f1f77bcf86cd799439012",
  "candidateId": "507f1f77bcf86cd799439013",
  "rating": 3,
  "comment": "Average experience. The role was as described but the onboarding process was lengthy."
}
```

---

## 7. Notification Routes

**Base Path:** `/notification`

### All Routes

```
POST   /notification                   - Create notification
GET    /notification                   - Get all notifications
GET    /notification/:id               - Get notification by ID
GET    /notification/user/:userId      - Get user notifications
GET    /notification/user/:userId/unread - Get unread notifications
PUT    /notification/:id/read          - Mark notification as read
PUT    /notification/user/:userId/read-all - Mark all as read
DELETE /notification/:id               - Delete notification
```

### POST - Create Notification

**Endpoint:** `POST /notification`

**JSON Body (Copy & Test):**

```json
{
  "userId": "507f1f77bcf86cd799439013",
  "userType": "candidate",
  "title": "Application Received",
  "message": "Your application for Senior Full Stack Developer at TechCorp Solutions has been received and is under review.",
  "type": "application",
  "relatedId": "507f1f77bcf86cd799439016"
}
```

**User Type Options:**

- "candidate"
- "company"

**Notification Type Options:**

- "application"
- "job"
- "review"
- "general"

**More Examples:**

```json
{
  "userId": "507f1f77bcf86cd799439012",
  "userType": "company",
  "title": "New Application",
  "message": "John Doe has applied for the Senior Full Stack Developer position.",
  "type": "application",
  "relatedId": "507f1f77bcf86cd799439016"
}
```

```json
{
  "userId": "507f1f77bcf86cd799439013",
  "userType": "candidate",
  "title": "Application Shortlisted",
  "message": "Congratulations! You have been shortlisted for the Senior Full Stack Developer position at TechCorp Solutions.",
  "type": "application",
  "relatedId": "507f1f77bcf86cd799439016"
}
```

```json
{
  "userId": "507f1f77bcf86cd799439013",
  "userType": "candidate",
  "title": "New Job Match",
  "message": "A new job matching your skills has been posted: Senior Full Stack Developer at TechCorp Solutions.",
  "type": "job",
  "relatedId": "507f1f77bcf86cd799439015"
}
```

---

## 8. Candidate Experience Routes

**Base Path:** `/candidateExperience`

### All Routes

```
POST   /candidateExperience                    - Add experience
GET    /candidateExperience                    - Get all experiences
GET    /candidateExperience/:id                - Get experience by ID
GET    /candidateExperience/candidate/:candidateId - Get candidate experiences
PUT    /candidateExperience/:id                - Update experience
DELETE /candidateExperience/:id                - Delete experience
```

### POST - Create Candidate Experience

**Endpoint:** `POST /candidateExperience`

**JSON Body (Copy & Test):**

```json
{
  "candidateId": "507f1f77bcf86cd799439013",
  "companyName": "Previous Tech Company",
  "companyLocation": "Boston, MA",
  "role": "Full Stack Developer",
  "description": "Developed and maintained multiple web applications using React and Node.js. Led a team of 3 junior developers and implemented CI/CD pipelines. Improved application performance by 40% through code optimization.",
  "startDate": "2021-06-01",
  "endDate": "2023-12-31"
}
```

**Current Position (no end date):**

```json
{
  "candidateId": "507f1f77bcf86cd799439013",
  "companyName": "Current Tech Startup",
  "companyLocation": "New York, NY",
  "role": "Senior Full Stack Developer",
  "description": "Currently working on enterprise-level applications using React, Node.js, and AWS. Leading the development of a new microservices architecture.",
  "startDate": "2024-01-01"
}
```

**Internship Example:**

```json
{
  "candidateId": "507f1f77bcf86cd799439013",
  "companyName": "Tech Innovations Inc",
  "companyLocation": "San Francisco, CA",
  "role": "Software Engineering Intern",
  "description": "Assisted in developing features for the company's main product. Learned best practices in software development and agile methodologies.",
  "startDate": "2020-06-01",
  "endDate": "2020-08-31"
}
```

---

## 9. Resume Routes

**Base Path:** `/resume`

### All Routes

```
POST   /resume                     - Upload resume (multipart/form-data)
GET    /resume                     - Get all resumes
GET    /resume/:id                 - Get resume by ID
GET    /resume/candidate/:candidateId - Get candidate resumes
PUT    /resume/:id                 - Update resume (multipart/form-data)
DELETE /resume/:id                 - Delete resume
```

### POST - Upload Resume

**Endpoint:** `POST /resume`

**Content-Type:** `multipart/form-data`

**Form Data:**

- `candidateId`: "507f1f77bcf86cd799439013"
- `resume`: [PDF file upload]

**Alternative (with URL):**

```json
{
  "candidateId": "507f1f77bcf86cd799439013",
  "resumeUrl": "https://example.com/resumes/john_doe_resume.pdf"
}
```

---

## 10. ShortList Routes

**Base Path:** `/shortList`

### All Routes

```
POST   /shortList                      - Add to shortlist
GET    /shortList                      - Get all shortlists
GET    /shortList/:id                  - Get shortlist by ID
GET    /shortList/job/:jobId           - Get job shortlists
GET    /shortList/company/:companyId   - Get company shortlists
GET    /shortList/candidate/:candidateId - Get candidate shortlists
DELETE /shortList/:id                  - Remove from shortlist
```

### POST - Create ShortList

**Endpoint:** `POST /shortList`

**JSON Body (Copy & Test):**

```json
{
  "jobId": "507f1f77bcf86cd799439015",
  "companyId": "507f1f77bcf86cd799439012",
  "candidateId": "507f1f77bcf86cd799439013"
}
```

---

## 🔄 Complete Workflow Example

### Step 1: Create Company Type

```json
POST /company
{
  "label": "Technology"
}
```

**Response:** Save the `_id` as `companyTypeId`

---

### Step 2: Create Company

```json
POST /company
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

**Response:** Save the `_id` as `companyId`

---

### Step 3: Create Candidate

```json
POST /candidate
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890",
  "city": "New York",
  "skills": ["JavaScript", "React", "Node.js", "TypeScript"],
  "education": "BS Computer Science",
  "yearsOfExperience": "3"
}
```

**Response:** Save the `_id` as `candidateId`

---

### Step 4: Create Job Type

```json
POST /job
{
  "label": "Full-Time"
}
```

**Response:** Save the `_id` as `jobTypeId`

---

### Step 5: Create Job

```json
POST /job
{
  "companyId": "{{companyId}}",
  "jobType": "{{jobTypeId}}",
  "title": "Senior Full Stack Developer",
  "description": "We are looking for an experienced developer...",
  "requirements": "5+ years experience with React and Node.js",
  "experience_level": "Mid-Senior Level",
  "salaryRange": "$100,000 - $150,000",
  "skills": ["React", "Node.js", "TypeScript", "MongoDB"],
  "deadline": "2024-12-31"
}
```

**Response:** Save the `_id` as `jobId`

---

### Step 6: Candidate Saves Job

```json
POST /savedJob
{
  "jobId": "{{jobId}}",
  "candidateId": "{{candidateId}}"
}
```

---

### Step 7: Candidate Adds Experience

```json
POST /candidateExperience
{
  "candidateId": "{{candidateId}}",
  "companyName": "Previous Company",
  "companyLocation": "Boston, MA",
  "role": "Full Stack Developer",
  "description": "Developed web applications",
  "startDate": "2021-01-01",
  "endDate": "2023-12-31"
}
```

---

### Step 8: Candidate Applies to Job

```json
POST /application
{
  "jobId": "{{jobId}}",
  "candidateId": "{{candidateId}}",
  "coverLetter": "Dear Hiring Manager, I am very interested in this position..."
}
```

**Response:** Save the `_id` as `applicationId`

---

### Step 9: Company Shortlists Candidate

```json
POST /shortList
{
  "jobId": "{{jobId}}",
  "companyId": "{{companyId}}",
  "candidateId": "{{candidateId}}"
}
```

---

### Step 10: Update Application Status

```json
PUT /application/{{applicationId}}
{
  "status": "shortlisted"
}
```

---

### Step 11: Candidate Reviews Company

```json
POST /review
{
  "companyId": "{{companyId}}",
  "candidateId": "{{candidateId}}",
  "rating": 5,
  "comment": "Great company to work with!"
}
```

---

## 📝 Response Format

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
  "message": "Error message",
  "error": {
    /* error details */
  }
}
```

---

## 💡 Testing Tips

1. **Use Postman or Thunder Client** to test these endpoints
2. **Replace placeholder IDs** (like `507f1f77bcf86cd799439012`) with actual IDs from your responses
3. **For file uploads**, use `multipart/form-data` content type
4. **Save IDs** from responses to use in subsequent requests
5. **Follow the workflow** example to test the complete flow
6. **Check unique constraints**: Email and phone must be unique for candidates

---

## 🔐 Authentication Notes

Some routes require authentication (marked with auth middleware):

- Candidate update/delete routes
- Company update/delete routes

Make sure to include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

- [Company & Organization](#company--organization)
- [Candidate](#candidate)
- [Job](#job)
- [Application](#application)
- [Saved Job](#saved-job)
- [Review](#review)
- [Notification](#notification)
- [Candidate Experience](#candidate-experience)
- [Resume](#resume)
- [ShortList](#shortlist)

---

## Company & Organization

### Organization Type (Company Type)

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "label": "Technology"
}
```

**Other examples:**

- "Healthcare"
- "Finance"
- "Education"
- "E-commerce"
- "Manufacturing"

### Company

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "TechCorp Solutions",
  "email": "contact@techcorp.com",
  "username": "techcorp",
  "logo": "https://res.cloudinary.com/demo/image/upload/v1234567890/logos/techcorp.png",
  "companyType": "507f1f77bcf86cd799439011",
  "location": "San Francisco, CA",
  "employee_len": "100-500",
  "password_hash": "$2b$10$abcdefghijklmnopqrstuvwxyz123456789",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Create Company Request:**

```json
{
  "name": "TechCorp Solutions",
  "email": "contact@techcorp.com",
  "username": "techcorp",
  "companyType": "507f1f77bcf86cd799439011",
  "location": "San Francisco, CA",
  "employee_len": "100-500",
  "password": "SecurePassword123!"
}
```

---

## Candidate

### Candidate (User)

```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "avatar": "https://res.cloudinary.com/demo/image/upload/v1234567890/avatars/john.jpg",
  "password": "$2b$10$hashedpassword",
  "role": "candidate",
  "city": "New York",
  "address": "123 Main Street, Apt 4B",
  "skills": ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB"],
  "education": "Bachelor of Science in Computer Science",
  "yearsOfExperience": "3",
  "github": "https://github.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe",
  "createdAt": "2024-01-10T08:00:00.000Z",
  "updatedAt": "2024-01-10T08:00:00.000Z"
}
```

**Create Candidate Request:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "password": "SecurePassword123!",
  "city": "New York",
  "address": "123 Main Street, Apt 4B",
  "skills": ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB"],
  "education": "Bachelor of Science in Computer Science",
  "yearsOfExperience": "3",
  "github": "https://github.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe"
}
```

---

## Job

### Job Type

```json
{
  "_id": "507f1f77bcf86cd799439014",
  "label": "Full-Time"
}
```

**Other examples:**

- "Part-Time"
- "Contract"
- "Internship"
- "Freelance"
- "Remote"

### Job

```json
{
  "_id": "507f1f77bcf86cd799439015",
  "companyId": "507f1f77bcf86cd799439012",
  "jobType": "507f1f77bcf86cd799439014",
  "title": "Senior Full Stack Developer",
  "description": "We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.",
  "requirements": "- 5+ years of experience in web development\n- Strong knowledge of React and Node.js\n- Experience with MongoDB and PostgreSQL\n- Excellent problem-solving skills\n- Bachelor's degree in Computer Science or related field",
  "experience_level": "Mid-Senior Level",
  "salaryRange": "$100,000 - $150,000",
  "skills": [
    "React",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "AWS"
  ],
  "deadline": "2024-03-31T23:59:59.000Z",
  "share_slug": "senior-full-stack-developer-techcorp-2024",
  "createdAt": "2024-01-20T09:00:00.000Z",
  "updatedAt": "2024-01-20T09:00:00.000Z"
}
```

**Create Job Request:**

```json
{
  "companyId": "507f1f77bcf86cd799439012",
  "jobType": "507f1f77bcf86cd799439014",
  "title": "Senior Full Stack Developer",
  "description": "We are looking for an experienced Full Stack Developer to join our growing team.",
  "requirements": "- 5+ years of experience\n- Strong React and Node.js skills",
  "experience_level": "Mid-Senior Level",
  "salaryRange": "$100,000 - $150,000",
  "skills": ["React", "Node.js", "TypeScript", "MongoDB"],
  "deadline": "2024-03-31"
}
```

**Experience Level Options:**

- "Internship"
- "Entry-Level"
- "Associate"
- "Mid-Senior Level"
- "Director"
- "Executive"

---

## Application

### Application

```json
{
  "_id": "507f1f77bcf86cd799439016",
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013",
  "coverLetter": "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Full Stack Developer position...",
  "resume": "https://res.cloudinary.com/demo/raw/upload/v1234567890/resumes/john_doe_resume.pdf",
  "status": "pending",
  "appliedAt": "2024-01-25T14:30:00.000Z",
  "createdAt": "2024-01-25T14:30:00.000Z",
  "updatedAt": "2024-01-25T14:30:00.000Z"
}
```

**Create Application Request (with file upload):**

```json
{
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013",
  "coverLetter": "Dear Hiring Manager, I am writing to express my interest..."
}
```

_Note: Resume file should be uploaded as multipart/form-data with field name "resume"_

**Update Application Status:**

```json
{
  "status": "reviewed"
}
```

**Status Options:**

- "pending"
- "reviewed"
- "shortlisted"
- "rejected"
- "accepted"

---

## Saved Job

### Saved Job

```json
{
  "_id": "507f1f77bcf86cd799439017",
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013",
  "savedAt": "2024-01-22T10:15:00.000Z",
  "createdAt": "2024-01-22T10:15:00.000Z",
  "updatedAt": "2024-01-22T10:15:00.000Z"
}
```

**Create Saved Job Request:**

```json
{
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013"
}
```

**Unsave Job Request:**

```json
{
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013"
}
```

---

## Review

### Review

```json
{
  "_id": "507f1f77bcf86cd799439018",
  "companyId": "507f1f77bcf86cd799439012",
  "candidateId": "507f1f77bcf86cd799439013",
  "rating": 5,
  "comment": "Great company to work with! The interview process was smooth and professional. The team is very supportive and the work environment is excellent.",
  "reviewDate": "2024-02-01T16:45:00.000Z",
  "createdAt": "2024-02-01T16:45:00.000Z",
  "updatedAt": "2024-02-01T16:45:00.000Z"
}
```

**Create Review Request:**

```json
{
  "companyId": "507f1f77bcf86cd799439012",
  "candidateId": "507f1f77bcf86cd799439013",
  "rating": 5,
  "comment": "Great company to work with! The interview process was smooth and professional."
}
```

**Update Review Request:**

```json
{
  "rating": 4,
  "comment": "Updated review: Good company overall with some areas for improvement."
}
```

**Rating Range:** 1-5 (integer)

---

## Notification

### Notification

```json
{
  "_id": "507f1f77bcf86cd799439019",
  "userId": "507f1f77bcf86cd799439013",
  "userType": "candidate",
  "title": "Application Received",
  "message": "Your application for Senior Full Stack Developer at TechCorp Solutions has been received and is under review.",
  "type": "application",
  "isRead": false,
  "relatedId": "507f1f77bcf86cd799439016",
  "createdAt": "2024-01-25T14:31:00.000Z",
  "updatedAt": "2024-01-25T14:31:00.000Z"
}
```

**Create Notification Request:**

```json
{
  "userId": "507f1f77bcf86cd799439013",
  "userType": "candidate",
  "title": "Application Received",
  "message": "Your application has been received and is under review.",
  "type": "application",
  "relatedId": "507f1f77bcf86cd799439016"
}
```

**User Type Options:**

- "candidate"
- "company"

**Notification Type Options:**

- "application"
- "job"
- "review"
- "general"

**Mark as Read:**

```json
{
  "isRead": true
}
```

---

## Candidate Experience

### Candidate Experience

```json
{
  "_id": "507f1f77bcf86cd79943901a",
  "candidateId": "507f1f77bcf86cd799439013",
  "companyName": "Previous Tech Company",
  "companyLocation": "Boston, MA",
  "role": "Full Stack Developer",
  "description": "Developed and maintained multiple web applications using React and Node.js. Led a team of 3 junior developers and implemented CI/CD pipelines.",
  "startDate": "2021-06-01",
  "endDate": "2023-12-31",
  "createdAt": "2024-01-10T08:30:00.000Z",
  "updatedAt": "2024-01-10T08:30:00.000Z"
}
```

**Create Experience Request:**

```json
{
  "candidateId": "507f1f77bcf86cd799439013",
  "companyName": "Previous Tech Company",
  "companyLocation": "Boston, MA",
  "role": "Full Stack Developer",
  "description": "Developed and maintained multiple web applications using React and Node.js.",
  "startDate": "2021-06-01",
  "endDate": "2023-12-31"
}
```

**Current Position (no end date):**

```json
{
  "candidateId": "507f1f77bcf86cd799439013",
  "companyName": "Current Company",
  "companyLocation": "New York, NY",
  "role": "Senior Developer",
  "description": "Currently working on enterprise applications.",
  "startDate": "2024-01-01"
}
```

---

## Resume

### Resume

```json
{
  "_id": "507f1f77bcf86cd79943901b",
  "candidateId": "507f1f77bcf86cd799439013",
  "resumeUrl": "https://res.cloudinary.com/demo/raw/upload/v1234567890/resumes/john_doe_resume_v2.pdf",
  "createdAt": "2024-01-10T09:00:00.000Z",
  "updatedAt": "2024-01-10T09:00:00.000Z"
}
```

**Create Resume Request (with file upload):**

```json
{
  "candidateId": "507f1f77bcf86cd799439013"
}
```

_Note: Resume file should be uploaded as multipart/form-data with field name "resume"_

**Alternative (with URL):**

```json
{
  "candidateId": "507f1f77bcf86cd799439013",
  "resumeUrl": "https://example.com/resumes/john_doe.pdf"
}
```

---

## ShortList

### ShortList

```json
{
  "_id": "507f1f77bcf86cd79943901c",
  "jobId": "507f1f77bcf86cd799439015",
  "companyId": "507f1f77bcf86cd799439012",
  "candidateId": "507f1f77bcf86cd799439013",
  "createdAt": "2024-01-26T11:20:00.000Z",
  "updatedAt": "2024-01-26T11:20:00.000Z"
}
```

**Create ShortList Request:**

```json
{
  "jobId": "507f1f77bcf86cd799439015",
  "companyId": "507f1f77bcf86cd799439012",
  "candidateId": "507f1f77bcf86cd799439013"
}
```

---

## Complete Example Workflow

### 1. Company Registration

```json
POST /api/company
{
  "name": "TechCorp Solutions",
  "email": "contact@techcorp.com",
  "username": "techcorp",
  "companyType": "507f1f77bcf86cd799439011",
  "location": "San Francisco, CA",
  "employee_len": "100-500",
  "password": "SecurePassword123!"
}
```

### 2. Candidate Registration

```json
POST /candidate/user
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "password": "SecurePassword123!",
  "city": "New York",
  "skills": ["JavaScript", "React", "Node.js"],
  "education": "BS Computer Science",
  "linkedin": "https://linkedin.com/in/johndoe"
}
```

### 3. Company Posts a Job

```json
POST /api/job
{
  "companyId": "507f1f77bcf86cd799439012",
  "jobType": "507f1f77bcf86cd799439014",
  "title": "Senior Full Stack Developer",
  "description": "We are looking for an experienced developer...",
  "requirements": "5+ years experience",
  "experience_level": "Mid-Senior Level",
  "salaryRange": "$100,000 - $150,000",
  "skills": ["React", "Node.js", "TypeScript"],
  "deadline": "2024-03-31"
}
```

### 4. Candidate Saves Job

```json
POST /api/saved-job
{
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013"
}
```

### 5. Candidate Applies to Job

```json
POST /api/application
Content-Type: multipart/form-data

{
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013",
  "coverLetter": "Dear Hiring Manager...",
  "resume": [file upload]
}
```

### 6. Company Reviews Application

```json
PUT /api/application/507f1f77bcf86cd799439016
{
  "status": "reviewed"
}
```

### 7. Company Shortlists Candidate

```json
POST /api/shortlist
{
  "jobId": "507f1f77bcf86cd799439015",
  "companyId": "507f1f77bcf86cd799439012",
  "candidateId": "507f1f77bcf86cd799439013"
}
```

### 8. Candidate Reviews Company

```json
POST /api/review
{
  "companyId": "507f1f77bcf86cd799439012",
  "candidateId": "507f1f77bcf86cd799439013",
  "rating": 5,
  "comment": "Great company to work with!"
}
```

---

## Response Format

All API responses follow this format:

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

---

## 11. Resume Analysis Routes

**Base Path:** `/resumeAnalysis`

### All Routes

```
POST   /resumeAnalysis/analyze           - Analyze resume (general ATS check)
POST   /resumeAnalysis/analyze-for-job   - Analyze resume for specific job
GET    /resumeAnalysis                   - Get all analyses
GET    /resumeAnalysis/:id               - Get analysis by ID
GET    /resumeAnalysis/candidate/:candidateId - Get candidate's analyses
DELETE /resumeAnalysis/:id               - Delete analysis
```

### POST - Analyze Resume (General ATS Check)

**Endpoint:** `POST /resumeAnalysis/analyze`

**Content-Type:** `multipart/form-data`

**Form Data:**

- `candidateId`: "507f1f77bcf86cd799439013"
- `resumeId`: "507f1f77bcf86cd799439020" (optional)
- `resume`: [PDF file upload]

**Description:** Upload a resume PDF and get comprehensive ATS (Applicant Tracking System) analysis including:

- ATS compatibility score
- Keyword analysis
- Formatting evaluation
- Strengths and weaknesses
- Improvement suggestions
- Section detection

**Response Example:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Resume analyzed successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439025",
    "candidateId": "507f1f77bcf86cd799439013",
    "resumeUrl": "https://res.cloudinary.com/.../resume.pdf",
    "analysisType": "general",
    "atsScore": 85,
    "keywordScore": 78,
    "formattingScore": 90,
    "overallScore": 84,
    "strengths": [
      "Clear and professional formatting",
      "Strong technical skills section",
      "Quantifiable achievements"
    ],
    "weaknesses": [
      "Missing professional summary",
      "Limited use of action verbs",
      "Could include more industry keywords"
    ],
    "suggestions": [
      "Add a professional summary at the top",
      "Use more action verbs like 'developed', 'implemented', 'led'",
      "Include relevant certifications",
      "Add links to portfolio or GitHub projects",
      "Optimize for ATS by using standard section headings"
    ],
    "matchedKeywords": [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "TypeScript"
    ],
    "missingKeywords": ["Docker", "CI/CD", "Agile", "Testing"],
    "sections": {
      "hasContactInfo": true,
      "hasExperience": true,
      "hasEducation": true,
      "hasSkills": true,
      "hasSummary": false
    },
    "aiAnalysis": "This resume demonstrates strong technical capabilities...",
    "createdAt": "2024-06-15T10:30:00.000Z"
  }
}
```

---

### POST - Analyze Resume for Job

**Endpoint:** `POST /resumeAnalysis/analyze-for-job`

**Content-Type:** `multipart/form-data`

**Form Data:**

- `candidateId`: "507f1f77bcf86cd799439013"
- `jobId`: "507f1f77bcf86cd799439015"
- `resumeId`: "507f1f77bcf86cd799439020" (optional)
- `resume`: [PDF file upload]

**Description:** Analyze how well a resume matches a specific job posting. Provides job-specific keyword matching, gap analysis, and tailored suggestions.

**Response Example:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Resume analyzed for job successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439026",
    "candidateId": "507f1f77bcf86cd799439013",
    "jobId": "507f1f77bcf86cd799439015",
    "resumeUrl": "https://res.cloudinary.com/.../resume.pdf",
    "analysisType": "job-specific",
    "atsScore": 85,
    "keywordScore": 72,
    "formattingScore": 90,
    "overallScore": 79,
    "strengths": [
      "Strong match with required React and Node.js skills",
      "Relevant experience in similar roles",
      "Good formatting for ATS systems"
    ],
    "weaknesses": [
      "Missing Docker experience mentioned in job requirements",
      "Limited AWS cloud experience",
      "No mention of CI/CD pipelines"
    ],
    "suggestions": [
      "Highlight any Docker or containerization experience",
      "Add AWS or cloud platform projects if available",
      "Include CI/CD pipeline experience or willingness to learn",
      "Emphasize team collaboration and agile methodologies",
      "Tailor professional summary to match job description"
    ],
    "matchedKeywords": [
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "REST API"
    ],
    "missingKeywords": [
      "Docker",
      "AWS",
      "CI/CD",
      "Kubernetes",
      "Microservices"
    ],
    "sections": {
      "hasContactInfo": true,
      "hasExperience": true,
      "hasEducation": true,
      "hasSkills": true,
      "hasSummary": false
    },
    "aiAnalysis": "The resume shows a 72% match with the job requirements for Senior Full Stack Developer...",
    "createdAt": "2024-06-15T10:35:00.000Z"
  }
}
```

---

### GET - Get All Analyses

**Endpoint:** `GET /resumeAnalysis`

**Description:** Retrieve all resume analyses (useful for admins)

---

### GET - Get Analysis by ID

**Endpoint:** `GET /resumeAnalysis/:id`

**Example:** `GET /resumeAnalysis/507f1f77bcf86cd799439025`

**Description:** Retrieve a specific resume analysis by its ID

---

### GET - Get Candidate's Analyses

**Endpoint:** `GET /resumeAnalysis/candidate/:candidateId`

**Example:** `GET /resumeAnalysis/candidate/507f1f77bcf86cd799439013`

**Description:** Get all resume analyses for a specific candidate

**Response Example:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Candidate resume analyses retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439025",
      "analysisType": "general",
      "overallScore": 84,
      "createdAt": "2024-06-15T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439026",
      "analysisType": "job-specific",
      "jobId": {
        "_id": "507f1f77bcf86cd799439015",
        "title": "Senior Full Stack Developer"
      },
      "overallScore": 79,
      "createdAt": "2024-06-15T10:35:00.000Z"
    }
  ]
}
```

---

### DELETE - Delete Analysis

**Endpoint:** `DELETE /resumeAnalysis/:id`

**Example:** `DELETE /resumeAnalysis/507f1f77bcf86cd799439025`

**Description:** Delete a resume analysis record

---

### Resume Analysis Workflow Example

**Step 1: Upload and Analyze Resume (General Check)**

```
POST /resumeAnalysis/analyze
Content-Type: multipart/form-data

Form Data:
- candidateId: "507f1f77bcf86cd799439013"
- resume: [upload resume.pdf]
```

**Step 2: Analyze Resume for Specific Job**

```
POST /resumeAnalysis/analyze-for-job
Content-Type: multipart/form-data

Form Data:
- candidateId: "507f1f77bcf86cd799439013"
- jobId: "507f1f77bcf86cd799439015"
- resume: [upload resume.pdf]
```

**Step 3: Review Analysis Results**

```
GET /resumeAnalysis/candidate/507f1f77bcf86cd799439013
```

---

### Important Notes for Resume Analysis

- **PDF Format Required**: Only PDF resumes are supported
- **AI-Powered**: Uses Google Gemini AI for intelligent analysis
- **Scoring System**: All scores are on a 0-100 scale
- **Analysis Types**:
  - `general`: Overall ATS compatibility check
  - `job-specific`: Tailored analysis against job requirements
- **Processing Time**: Analysis may take 5-15 seconds depending on resume length
- **File Size**: Recommended maximum 5MB per PDF

---

---

## Notes

- All `_id` fields are MongoDB ObjectIds (24-character hexadecimal strings)
- Dates are in ISO 8601 format
- File uploads use `multipart/form-data` encoding
- Passwords are hashed using bcrypt before storage
- All timestamps are automatically managed by MongoDB
- Unique constraints prevent duplicate applications, saved jobs, reviews, and shortlists
