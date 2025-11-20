# Admin System - Setup Guide

## Overview

The admin system allows you to create super admin users who can manage the entire job portal platform.

## Creating the First Admin

### Step 1: Ensure Environment is Configured

Make sure your `.env.local` file has the database URL:

```env
DATABASE_URL=mongodb://localhost:27017/cupitor
BCRYPT_SALT_ROUNDS=10
```

### Step 2: Run the Seed Script

```bash
npm run seed:admin
```

This will create an admin with:

- **Email:** `admin@cupitor.com`
- **Password:** `Admin@123!`
- **Role:** `admin`

### Step 3: Login as Admin

```bash
POST /auth/login
{
  "email": "admin@cupitor.com",
  "password": "Admin@123!"
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
      "email": "admin@cupitor.com",
      "role": "admin"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "role": "admin"
  }
}
```

### Step 4: Change Default Password

**IMPORTANT:** Change the default password immediately after first login!

You can update the admin password by:

1. Creating an admin update endpoint
2. Or manually updating in the database

---

## Admin Model Structure

```typescript
{
  _id: ObjectId
  name: string
  email: string(unique)
  password: string(hashed)
  role: 'admin'
  createdAt: Date
  updatedAt: Date
}
```

---

## Features

✅ **Password Hashing** - Bcrypt with configurable salt rounds
✅ **Unique Email** - Prevents duplicate admin accounts
✅ **Unified Login** - Same login endpoint as candidates and companies
✅ **JWT Tokens** - Secure authentication with role-based access
✅ **Password Hidden** - Passwords never exposed in API responses

---

## Security Best Practices

1. **Change Default Password** - Immediately after first login
2. **Use Strong Passwords** - Minimum 12 characters with mixed case, numbers, symbols
3. **Limit Admin Accounts** - Only create admins when necessary
4. **Monitor Admin Activity** - Log all admin actions
5. **Use Environment Variables** - Never hardcode credentials

---

## Customizing the Seed Script

Edit `src/scripts/seedAdmin.ts` to change default values:

```typescript
const ADMIN_EMAIL = 'your-email@example.com'
const ADMIN_PASSWORD = 'YourSecurePassword123!'
const ADMIN_NAME = 'Your Name'
```

---

## Troubleshooting

### Admin Already Exists

If you see "Admin already exists", the admin has been created. Use the login endpoint.

### Database Connection Error

Check your `DATABASE_URL` in `.env.local` and ensure MongoDB is running.

### Permission Denied

Ensure you have write access to the database.

---

## Next Steps

1. ✅ Create first admin using seed script
2. ✅ Login and get access token
3. 🔄 Create admin management endpoints (CRUD)
4. 🔄 Add role-based middleware for protected routes
5. 🔄 Implement admin-only features (user management, analytics, etc.)

---

## Admin Management Endpoints (To Be Implemented)

Future endpoints for admin management:

- `GET /admin` - List all admins (admin only)
- `POST /admin` - Create new admin (admin only)
- `PUT /admin/:id` - Update admin (admin only)
- `DELETE /admin/:id` - Delete admin (admin only)
- `PUT /admin/:id/password` - Change password
