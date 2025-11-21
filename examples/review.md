# Review Module Documentation

## Routes

| Method | Endpoint                         | Description                |
| :----- | :------------------------------- | :------------------------- |
| POST   | `/review`                        | Create a new review        |
| GET    | `/review`                        | Get all reviews            |
| GET    | `/review/:id`                    | Get review by ID           |
| GET    | `/review/company/:companyId`     | Get reviews for a company  |
| GET    | `/review/candidate/:candidateId` | Get reviews by a candidate |
| PUT    | `/review/:id`                    | Update a review            |
| DELETE | `/review/:id`                    | Delete a review            |

## JSON Examples

### Create Review

```json
{
  "companyId": "507f1f77bcf86cd799439012",
  "candidateId": "507f1f77bcf86cd799439013",
  "rating": 5,
  "comment": "Great company to work with! The interview process was smooth and professional. The team is very supportive and the work environment is excellent. I highly recommend TechCorp Solutions to other developers."
}
```

### Update Review

```json
{
  "rating": 4,
  "comment": "Updated review: Good company overall with some areas for improvement."
}
```

**Rating Range:** 1-5 (integer)

### Review Object Structure

```json
{
  "_id": "507f1f77bcf86cd799439018",
  "companyId": "507f1f77bcf86cd799439012",
  "candidateId": "507f1f77bcf86cd799439013",
  "rating": 5,
  "comment": "Great company to work with! The interview process was smooth and professional.",
  "reviewDate": "2024-02-01T16:45:00.000Z",
  "createdAt": "2024-02-01T16:45:00.000Z",
  "updatedAt": "2024-02-01T16:45:00.000Z"
}
```
