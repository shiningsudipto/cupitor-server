# Candidate Experience Module Documentation

## Routes

| Method | Endpoint                                      | Description                     |
| :----- | :-------------------------------------------- | :------------------------------ |
| POST   | `/candidateExperience`                        | Add new work experience         |
| GET    | `/candidateExperience`                        | Get all experiences             |
| GET    | `/candidateExperience/:id`                    | Get experience by ID            |
| GET    | `/candidateExperience/candidate/:candidateId` | Get experiences for a candidate |
| PUT    | `/candidateExperience/:id`                    | Update experience details       |
| DELETE | `/candidateExperience/:id`                    | Delete experience               |

## JSON Examples

### Create Experience (Past)

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

### Create Experience (Current)

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

### Candidate Experience Object Structure

```json
{
  "_id": "507f1f77bcf86cd79943901a",
  "candidateId": "507f1f77bcf86cd799439013",
  "companyName": "Previous Tech Company",
  "companyLocation": "Boston, MA",
  "role": "Full Stack Developer",
  "description": "Developed and maintained multiple web applications using React and Node.js...",
  "startDate": "2021-06-01",
  "endDate": "2023-12-31",
  "createdAt": "2024-01-10T08:30:00.000Z",
  "updatedAt": "2024-01-10T08:30:00.000Z"
}
```
