# Job Module Documentation

## Routes

| Method | Endpoint                  | Description              |
| :----- | :------------------------ | :----------------------- |
| POST   | `/job`                    | Create a new job posting |
| GET    | `/job`                    | Get all jobs             |
| GET    | `/job/:id`                | Get job by ID            |
| GET    | `/job/company/:companyId` | Get jobs by company ID   |
| PUT    | `/job/:id`                | Update job details       |
| DELETE | `/job/:id`                | Delete job               |

## JSON Examples

### Create Job

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

### Create Job Type

**Endpoint:** `POST /job` (handled via specific logic or separate route)

```json
{ "label": "Full-Time" }
```

**Other Job Types:**

- Part-Time
- Contract
- Internship
- Freelance
- Remote

### Job Object Structure

```json
{
  "_id": "507f1f77bcf86cd799439015",
  "companyId": "507f1f77bcf86cd799439012",
  "jobType": "507f1f77bcf86cd799439014",
  "title": "Senior Full Stack Developer",
  "description": "We are looking for an experienced Full Stack Developer...",
  "requirements": "5+ years of experience...",
  "experience_level": "Mid-Senior Level",
  "salaryRange": "$100,000 - $150,000",
  "skills": ["React", "Node.js", "TypeScript"],
  "deadline": "2024-03-31T23:59:59.000Z",
  "share_slug": "senior-full-stack-developer-techcorp-2024",
  "createdAt": "2024-01-20T09:00:00.000Z",
  "updatedAt": "2024-01-20T09:00:00.000Z"
}
```
