# Multi-Role Admin System

## Overview

The admin system now supports three distinct roles with different permission levels:

- **Super Admin** - Full system access, can create/update/delete all admins
- **Admin** - Can view admins and manage platform content
- **Moderator** - Limited administrative access

## Admin Roles

### 1. Super Admin (`super_admin`)

- **Permissions:**
  - Create new admins (super_admin, admin, moderator)
  - Update any admin
  - Delete any admin
  - View all admins
  - Full platform access

### 2. Admin (`admin`)

- **Permissions:**
  - View all admins
  - Manage platform content
  - Cannot create/update/delete admins

### 3. Moderator (`moderator`)

- **Permissions:**
  - Limited content moderation
  - Cannot manage admins
  - Cannot access sensitive data

---

## Setup: Creating the First Super Admin

### Step 1: Run the Seed Script

```bash
npm run seed:admin
```

This creates a super admin with:

- **Email:** `superadmin@cupitor.com`
- **Password:** `SuperAdmin@123!`
- **Role:** `super_admin`

### Step 2: Login as Super Admin

```bash
POST /auth/login
{
  "email": "superadmin@cupitor.com",
  "password": "SuperAdmin@123!"
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
      "_id": "...",
      "name": "Super Admin",
      "email": "superadmin@cupitor.com",
      "role": "super_admin"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "role": "super_admin"
  }
}
```

---

## Admin Management API

**Base Path:** `/admin`

All admin routes require authentication. Use the access token in the Authorization header:

```
Authorization: Bearer <access-token>
```

### Create Admin (Super Admin Only)

**Endpoint:** `POST /admin`
**Required Role:** `super_admin`

**Request Body:**

```json
{
  "name": "John Admin",
  "email": "john@cupitor.com",
  "password": "SecurePass123!",
  "role": "admin"
}
```

**Role Options:**

- `"super_admin"` - Creates another super admin
- `"admin"` - Creates a regular admin
- `"moderator"` - Creates a moderator

**Response:**

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {
    "_id": "...",
    "name": "John Admin",
    "email": "john@cupitor.com",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Get All Admins

**Endpoint:** `GET /admin`
**Required Role:** `super_admin` or `admin`

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Admins retrieved successfully",
  "data": [
    {
      "_id": "...",
      "name": "Super Admin",
      "email": "superadmin@cupitor.com",
      "role": "super_admin",
      "createdAt": "...",
      "updatedAt": "..."
    },
    {
      "_id": "...",
      "name": "John Admin",
      "email": "john@cupitor.com",
      "role": "admin",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

### Get Admin by ID

**Endpoint:** `GET /admin/:id`
**Required Role:** `super_admin` or `admin`

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Admin retrieved successfully",
  "data": {
    "_id": "...",
    "name": "John Admin",
    "email": "john@cupitor.com",
    "role": "admin",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### Update Admin (Super Admin Only)

**Endpoint:** `PUT /admin/:id`
**Required Role:** `super_admin`

**Request Body:**

```json
{
  "name": "John Updated",
  "role": "moderator"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Admin updated successfully",
  "data": {
    "_id": "...",
    "name": "John Updated",
    "email": "john@cupitor.com",
    "role": "moderator",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### Delete Admin (Super Admin Only)

**Endpoint:** `DELETE /admin/:id`
**Required Role:** `super_admin`

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Admin deleted successfully",
  "data": {
    "_id": "...",
    "name": "John Admin",
    "email": "john@cupitor.com",
    "role": "admin"
  }
}
```

---

## Permission Matrix

| Action       | Super Admin | Admin | Moderator |
| ------------ | ----------- | ----- | --------- |
| Create Admin | ✅          | ❌    | ❌        |
| View Admins  | ✅          | ✅    | ❌        |
| Update Admin | ✅          | ❌    | ❌        |
| Delete Admin | ✅          | ❌    | ❌        |
| Login        | ✅          | ✅    | ✅        |

---

## Security Best Practices

1. **Protect Super Admin Account**

   - Change default password immediately
   - Use strong, unique password
   - Enable 2FA (to be implemented)

2. **Limit Super Admin Accounts**

   - Only create super admins when absolutely necessary
   - Regularly audit super admin accounts

3. **Role-Based Access**

   - Assign minimum required role
   - Regularly review admin permissions
   - Remove inactive admin accounts

4. **Password Policy**

   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - No common passwords

5. **Audit Logging**
   - Log all admin actions (to be implemented)
   - Monitor suspicious activity
   - Regular security reviews

---

## Testing Examples

### 1. Create Super Admin

```bash
npm run seed:admin
```

### 2. Login as Super Admin

```bash
POST /auth/login
{
  "email": "superadmin@cupitor.com",
  "password": "SuperAdmin@123!"
}
# Save the accessToken
```

### 3. Create Regular Admin

```bash
POST /admin
Headers: Authorization: Bearer <super-admin-token>
{
  "name": "Regular Admin",
  "email": "admin@cupitor.com",
  "password": "Admin@123!",
  "role": "admin"
}
```

### 4. Create Moderator

```bash
POST /admin
Headers: Authorization: Bearer <super-admin-token>
{
  "name": "Moderator User",
  "email": "moderator@cupitor.com",
  "password": "Moderator@123!",
  "role": "moderator"
}
```

### 5. Login as Regular Admin

```bash
POST /auth/login
{
  "email": "admin@cupitor.com",
  "password": "Admin@123!"
}
# Response will have role: "admin"
```

### 6. View All Admins (as Admin)

```bash
GET /admin
Headers: Authorization: Bearer <admin-token>
# Should work - admins can view other admins
```

### 7. Try to Create Admin (as Regular Admin)

```bash
POST /admin
Headers: Authorization: Bearer <admin-token>
{
  "name": "Test",
  "email": "test@cupitor.com",
  "password": "Test@123!",
  "role": "admin"
}
# Should fail - only super_admin can create admins
```

---

## Troubleshooting

### "Unauthorized" Error

- Check if token is valid and not expired
- Verify you're using the correct role for the endpoint
- Ensure Authorization header is properly formatted

### "Admin already exists"

- Email must be unique
- Check if admin with that email already exists

### Cannot Create Admin

- Only super_admin can create new admins
- Verify your token has super_admin role

---

## Next Steps

1. ✅ Create super admin using seed script
2. ✅ Login and get access token
3. ✅ Create additional admins with different roles
4. 🔄 Implement password change endpoint
5. 🔄 Add 2FA authentication
6. 🔄 Implement audit logging
7. 🔄 Add admin activity dashboard
