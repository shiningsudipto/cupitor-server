# Saved Job Module Documentation

## Routes

| Method | Endpoint                           | Description                             |
| :----- | :--------------------------------- | :-------------------------------------- |
| POST   | `/savedJob`                        | Save a job for a candidate              |
| GET    | `/savedJob`                        | Get all saved jobs                      |
| GET    | `/savedJob/:id`                    | Get saved job entry by ID               |
| GET    | `/savedJob/candidate/:candidateId` | Get all saved jobs for a candidate      |
| DELETE | `/savedJob/:id`                    | Remove a saved job entry by ID          |
| POST   | `/savedJob/unsave`                 | Unsave a job by Job ID and Candidate ID |

## JSON Examples

### Save Job

```json
{
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013"
}
```

### Unsave Job

```json
{
  "jobId": "507f1f77bcf86cd799439015",
  "candidateId": "507f1f77bcf86cd799439013"
}
```

### Saved Job Object Structure

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
