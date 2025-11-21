# Resume Analysis Module Documentation

## Routes

| Method | Endpoint                                 | Description                                         |
| :----- | :--------------------------------------- | :-------------------------------------------------- |
| POST   | `/resumeAnalysis/analyze`                | Analyze a resume (General ATS Check)                |
| POST   | `/resumeAnalysis/analyze-for-job`        | Analyze a resume against a specific job description |
| GET    | `/resumeAnalysis`                        | Get all analysis records                            |
| GET    | `/resumeAnalysis/:id`                    | Get analysis by ID                                  |
| GET    | `/resumeAnalysis/candidate/:candidateId` | Get all analyses for a candidate                    |
| DELETE | `/resumeAnalysis/:id`                    | Delete an analysis record                           |
| PUT    | `/resumeAnalysis/:id/title`              | Update the title of an analysis                     |

## JSON Examples

### Analyze Resume (General)

**Endpoint:** `POST /resumeAnalysis/analyze`
**Content-Type:** `multipart/form-data`

**Form Fields:**

- `candidateId`: "507f1f77bcf86cd799439013"
- `resume`: [PDF file upload]

### Analyze Resume for Job

**Endpoint:** `POST /resumeAnalysis/analyze-for-job`
**Content-Type:** `application/json`

```json
{
  "candidateId": "507f1f77bcf86cd799439013",
  "jobId": "507f1f77bcf86cd799439015",
  "resumeAnalysisId": "507f1f77bcf86cd799439025"
}
```

### Update Analysis Title

**Endpoint:** `PUT /resumeAnalysis/:id/title`

```json
{
  "title": "My New Analysis Title"
}
```

### Response Examples

**General Analysis Response:**

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
    "title": "Resume Analysis - 11/21/2025",
    "overallScore": 84,
    "strengths": [
      "Clear and professional formatting",
      "Strong technical skills section"
    ],
    "weaknesses": ["Missing professional summary"],
    "suggestions": ["Add a professional summary at the top"],
    "matchedKeywords": ["JavaScript", "React", "Node.js"],
    "missingKeywords": [],
    "createdAt": "2024-06-15T10:30:00.000Z"
  }
}
```

**Job-Specific Analysis Response:**

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
    "title": "Job Analysis: Senior Full Stack Developer",
    "atsScore": 85,
    "keywordScore": 72,
    "formattingScore": 90,
    "overallScore": 79,
    "strengths": ["Strong match with required React and Node.js skills"],
    "weaknesses": ["Missing Docker experience"],
    "suggestions": ["Highlight any Docker experience"],
    "matchedKeywords": ["React", "Node.js"],
    "missingKeywords": ["Docker", "AWS"],
    "createdAt": "2024-06-15T10:35:00.000Z"
  }
}
```
