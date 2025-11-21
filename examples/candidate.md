# Candidate Module Documentation

## Routes

| Method | Endpoint                  | Description                                   |
| :----- | :------------------------ | :-------------------------------------------- |
| POST   | `/candidate`              | Create a new candidate                        |
| GET    | `/candidate`              | Get all candidates                            |
| GET    | `/candidate/:id`          | Get candidate by ID                           |
| GET    | `/candidate/slug/:slug`   | Get candidate by slug                         |
| GET    | `/candidate/email/:email` | Get candidate by email                        |
| PUT    | `/candidate/:id`          | Update candidate details                      |
| PUT    | `/candidate/avatar/:id`   | Update candidate avatar (multipart/form-data) |
| DELETE | `/candidate/:id`          | Delete candidate                              |

## JSON Examples

### Create Candidate (Full)

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

### Create Candidate (Minimal)

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "password": "SecurePass123!",
  "phone": "+9876543210"
}
```

### Candidate Object Structure

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
