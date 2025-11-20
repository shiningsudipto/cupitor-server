# Authentication System - Documentation

## Overview

The authentication system supports login and registration for three user types:

- **Candidates** - Job seekers
- **Companies** - Employers
- **Admins** - System administrators (to be implemented)

## API Endpoints

### Base Path: `/auth`

### 1. Candidate Registration

**Endpoint:** `POST /auth/register/candidate`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890",
  "city": "New York",
  "skills": ["JavaScript", "React"],
  "education": "BS Computer Science"
}
```

**Response:**

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Candidate registered successfully",
  "data": {
    "user": {
      /* candidate object without password */
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2. Company Registration

**Endpoint:** `POST /auth/register/company`

**Request Body:**

```json
{
  "name": "TechCorp Solutions",
  "email": "contact@techcorp.com",
  "username": "techcorp",
  "password": "CompanyPass123!",
  "companyType": "507f1f77bcf86cd799439011",
  "location": "San Francisco, CA",
  "employee_len": "100-500"
}
```

**Response:**

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Company registered successfully",
  "data": {
    "user": {
      /* company object without password */
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. Login (All User Types)

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      /* user object without password */
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "role": "candidate" // or "company" or "admin"
  }
}
```

---

## Features

### ✅ Password Security

- Passwords are hashed using **bcrypt** with configurable salt rounds
- Passwords are automatically hashed before saving (using Mongoose pre-save hooks)
- Passwords are hidden in JSON responses (using toJSON method)

### ✅ JWT Tokens

- Access tokens are generated on successful registration/login
- Tokens contain: `userId`, `role`, and `email`
- Token expiration is configurable via environment variables
- Tokens should be included in protected route requests:
  ```
  Authorization: Bearer <access-token>
  ```

### ✅ Validation

- Email uniqueness for both candidates and companies
- Phone uniqueness for candidates
- Username uniqueness for companies
- Proper error messages for duplicate entries

### ✅ Unified Login

- Single login endpoint for all user types
- Automatically detects user type (candidate or company)
- Returns role in response for frontend routing

---

## Security Best Practices

1. **Password Requirements** (implement in validation):

   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character

2. **Token Management**:

   - Store tokens securely on client (httpOnly cookies recommended)
   - Implement token refresh mechanism
   - Clear tokens on logout

3. **Rate Limiting** (to be implemented):
   - Limit login attempts to prevent brute force attacks
   - Implement account lockout after failed attempts

---

## JWT Token Structure

**Payload:**

```json
{
  "userId": "507f1f77bcf86cd799439013",
  "role": "candidate",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234567890
}
```

**Decoding on Frontend:**

```javascript
const decoded = jwt_decode(accessToken)
console.log(decoded.role) // "candidate", "company", or "admin"
```

---

## Error Responses

**Duplicate Email:**

```json
{
  "statusCode": 400,
  "success": false,
  "message": "Candidate with this email already exists"
}
```

**Invalid Credentials:**

```json
{
  "statusCode": 400,
  "success": false,
  "message": "Invalid email or password"
}
```

---

## Next Steps

1. **Add Admin Model** - Create admin user type with elevated permissions
2. **Implement Refresh Tokens** - Add token refresh endpoint
3. **Add Password Reset** - Implement forgot password flow
4. **Add Email Verification** - Send verification emails on registration
5. **Add OAuth** - Support Google/LinkedIn login
6. **Add Rate Limiting** - Prevent brute force attacks
7. **Add Validation** - Use Zod for request validation

---

## Testing

Use the examples above to test in Postman/Thunder Client:

1. **Register a candidate** → Save the access token
2. **Register a company** → Save the access token
3. **Login with candidate credentials** → Verify token and role
4. **Login with company credentials** → Verify token and role
5. **Use token in protected routes** → Add to Authorization header
