# Authentication Module Documentation

## Routes

| Method | Endpoint                   | Description                                           |
| :----- | :------------------------- | :---------------------------------------------------- |
| POST   | `/auth/register/candidate` | Register a new candidate account                      |
| POST   | `/auth/register/company`   | Register a new company account                        |
| POST   | `/auth/login`              | Login (for all user types: candidate, company, admin) |

## JSON Examples

### Register Candidate

**Endpoint:** `POST /auth/register/candidate`

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890",
  "city": "New York",
  "address": "123 Main Street, Apt 4B",
  "skills": ["JavaScript", "React", "Node.js", "TypeScript"],
  "education": "Bachelor of Science in Computer Science",
  "yearsOfExperience": "3",
  "github": "https://github.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe"
}
```

**Minimal Registration:**

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "password": "SecurePass123!",
  "phone": "+9876543210"
}
```

### Register Company

**Endpoint:** `POST /auth/register/company`

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

**Note:** You need to create a `CompanyType` first and use its ID in the `companyType` field.

### Login

**Endpoint:** `POST /auth/login`

**For Candidate:**

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "userType": "candidate"
}
```

**For Company:**

```json
{
  "email": "contact@techcorp.com",
  "password": "CompanyPass123!",
  "userType": "company"
}
```

**For Admin:**

```json
{
  "email": "admin@cupitor.com",
  "password": "AdminPass123!",
  "userType": "admin"
}
```

**User Type Options:**

- "candidate"
- "company"
- "admin"

### Response Examples

**Registration Success:**

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Candidate registered successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "role": "candidate",
    "skills": ["JavaScript", "React", "Node.js"],
    "createdAt": "2024-01-10T08:00:00.000Z"
  }
}
```

**Login Success:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "candidate"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (Invalid Credentials):**

```json
{
  "statusCode": 401,
  "success": false,
  "message": "Invalid credentials"
}
```

**Error Response (Email Already Exists):**

```json
{
  "statusCode": 409,
  "success": false,
  "message": "Email already registered"
}
```

## Authentication Flow

### 1. Registration

Choose the appropriate registration endpoint based on user type:

- Candidates use `/auth/register/candidate`
- Companies use `/auth/register/company`

### 2. Login

All user types use the same login endpoint `/auth/login` but specify their `userType` in the request body.

### 3. Using the Token

After successful login, include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Password Requirements

- Minimum 8 characters
- Should include uppercase, lowercase, numbers, and special characters (recommended)
- Passwords are automatically hashed using bcrypt before storage
