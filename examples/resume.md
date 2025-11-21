# Resume Module Documentation

## Routes

| Method | Endpoint                         | Description                               |
| :----- | :------------------------------- | :---------------------------------------- |
| POST   | `/resume`                        | Upload a new resume (multipart/form-data) |
| GET    | `/resume`                        | Get all resumes                           |
| GET    | `/resume/:id`                    | Get resume by ID                          |
| GET    | `/resume/candidate/:candidateId` | Get resumes for a candidate               |
| PUT    | `/resume/:id`                    | Update resume (multipart/form-data)       |
| DELETE | `/resume/:id`                    | Delete resume                             |

## JSON Examples

### Upload Resume (Multipart Form Data)

**Endpoint:** `POST /resume`

**Form Fields:**

- `candidateId`: "507f1f77bcf86cd799439013"
- `resume`: [PDF file upload]

### Upload Resume (JSON with URL)

```json
{
  "candidateId": "507f1f77bcf86cd799439013",
  "resumeUrl": "https://example.com/resumes/john_doe_resume.pdf"
}
```

### Resume Object Structure

```json
{
  "_id": "507f1f77bcf86cd79943901b",
  "candidateId": "507f1f77bcf86cd799439013",
  "resumeUrl": "https://res.cloudinary.com/demo/raw/upload/v1234567890/resumes/john_doe_resume_v2.pdf",
  "createdAt": "2024-01-10T09:00:00.000Z",
  "updatedAt": "2024-01-10T09:00:00.000Z"
}
```
