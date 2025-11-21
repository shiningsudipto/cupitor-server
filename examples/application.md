# Application Module Documentation

## Routes

| Method | Endpoint                              | Description                                       |
| :----- | :------------------------------------ | :------------------------------------------------ |
| POST   | `/application`                        | Submit a new application (supports resume upload) |
| GET    | `/application`                        | Get all applications                              |
| GET    | `/application/:id`                    | Get application by ID                             |
| GET    | `/application/candidate/:candidateId` | Get applications by candidate                     |
| GET    | `/application/job/:jobId`             | Get applications for a job                        |
| PUT    | `/application/:id`                    | Update application status                         |
| DELETE | `/application/:id`                    | Delete application                                |

## JSON Examples

### Create Application (JSON Body)

**Note:** If uploading a file, use `multipart/form-data`.

```json
{
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013",
  "coverLetter": "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Full Stack Developer position at TechCorp Solutions. With over 5 years of experience in full-stack development and a proven track record of delivering high-quality web applications, I am confident in my ability to contribute to your team.\n\nMy expertise includes:\n- Building scalable applications with React and Node.js\n- Database design and optimization with MongoDB and PostgreSQL\n- Implementing CI/CD pipelines and cloud deployments\n- Leading development teams and mentoring junior developers\n\nI am excited about the opportunity to bring my skills to TechCorp Solutions and help drive innovation in your projects.\n\nThank you for considering my application.\n\nBest regards,\nJohn Doe"
}
```

### Update Application Status

```json
{
  "status": "reviewed"
}
```

**Status Options:**

- "pending" (default)
- "reviewed"
- "shortlisted"
- "rejected"
- "accepted"

### Application Object Structure

```json
{
  "_id": "507f1f77bcf86cd799439016",
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013",
  "coverLetter": "Dear Hiring Manager...",
  "resume": "https://res.cloudinary.com/demo/raw/upload/v1234567890/resumes/john_doe_resume.pdf",
  "status": "pending",
  "appliedAt": "2024-01-25T14:30:00.000Z",
  "createdAt": "2024-01-25T14:30:00.000Z",
  "updatedAt": "2024-01-25T14:30:00.000Z"
}
```
