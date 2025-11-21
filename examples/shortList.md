# ShortList Module Documentation

## Routes

| Method | Endpoint                            | Description                            |
| :----- | :---------------------------------- | :------------------------------------- |
| POST   | `/shortList`                        | Add a candidate to shortlist for a job |
| GET    | `/shortList`                        | Get all shortlists                     |
| GET    | `/shortList/:id`                    | Get shortlist entry by ID              |
| GET    | `/shortList/job/:jobId`             | Get shortlists for a specific job      |
| GET    | `/shortList/company/:companyId`     | Get shortlists for a company           |
| GET    | `/shortList/candidate/:candidateId` | Get shortlists for a candidate         |
| DELETE | `/shortList/:id`                    | Remove from shortlist                  |

## JSON Examples

### Create ShortList

```json
{
  "jobId": "507f1f77bcf86cd799439015",
  "companyId": "507f1f77bcf86cd799439012",
  "candidateId": "507f1f77bcf86cd799439013"
}
```

### ShortList Object Structure

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
