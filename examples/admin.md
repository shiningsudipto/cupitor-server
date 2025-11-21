# Admin Module Documentation

## Routes

| Method | Endpoint     | Description                | Auth Required         |
| :----- | :----------- | :------------------------- | :-------------------- |
| POST   | `/admin`     | Create a new admin account | ✓ Super Admin         |
| GET    | `/admin`     | Get all admins             | ✓ Super Admin / Admin |
| GET    | `/admin/:id` | Get admin by ID            | ✓ Super Admin / Admin |
| PUT    | `/admin/:id` | Update admin details       | ✓ Super Admin         |
| DELETE | `/admin/:id` | Delete admin account       | ✓ Super Admin         |

## Admin Roles

The system supports three admin role levels:

1. **super_admin** - Full system access, can manage all admins
2. **admin** - Can view admins and perform administrative tasks
3. **moderator** - Limited administrative permissions

## JSON Examples

### Create Admin (Super Admin Only)

**Endpoint:** `POST /admin`

**Headers:**

```
Authorization: Bearer {super_admin_token}
```

**Request Body:**

```json
{
  "name": "Jane Admin",
  "email": "jane.admin@cupitor.com",
  "password": "AdminSecure123!",
  "role": "admin"
}
```

**Create Super Admin:**

```json
{
  "name": "Super Admin",
  "email": "super@cupitor.com",
  "password": "SuperSecure123!",
  "role": "super_admin"
}
```

**Create Moderator:**

```json
{
  "name": "Moderator User",
  "email": "moderator@cupitor.com",
  "password": "ModSecure123!",
  "role": "moderator"
}
```

### Update Admin

**Endpoint:** `PUT /admin/:id`

**Headers:**

```
Authorization: Bearer {super_admin_token}
```

**Request Body:**

```json
{
  "name": "Jane Updated Admin",
  "role": "super_admin"
}
```

### Admin Object Structure

```json
{
  "_id": "507f1f77bcf86cd799439020",
  "name": "Jane Admin",
  "email": "jane.admin@cupitor.com",
  "role": "admin",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

**Note:** Password is never returned in responses (hidden via toJSON method).

## Response Examples

**Create Admin Success:**

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "name": "Jane Admin",
    "email": "jane.admin@cupitor.com",
    "role": "admin",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

**Get All Admins Success:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Admins retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "name": "Super Admin",
      "email": "super@cupitor.com",
      "role": "super_admin",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439021",
      "name": "Jane Admin",
      "email": "jane.admin@cupitor.com",
      "role": "admin",
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

**Error Response (Unauthorized):**

```json
{
  "statusCode": 401,
  "success": false,
  "message": "Unauthorized access"
}
```

**Error Response (Forbidden - Not Super Admin):**

```json
{
  "statusCode": 403,
  "success": false,
  "message": "You do not have permission to perform this action"
}
```

## Admin Setup Workflow

### Initial Super Admin Creation

The first super admin should be created via seeding script or direct database insertion:

```javascript
// seed.ts or setup script
import { Admin } from './admin.model'

const createSuperAdmin = async () => {
  const superAdmin = await Admin.create({
    name: 'Super Admin',
    email: 'super@cupitor.com',
    password: 'SuperSecure123!', // Will be auto-hashed
    role: 'super_admin',
  })
  console.log('Super admin created:', superAdmin.email)
}
```

### Creating Additional Admins

1. **Login as Super Admin**

   ```json
   POST /auth/login
   {
     "email": "super@cupitor.com",
     "password": "SuperSecure123!",
     "userType": "admin"
   }
   ```

2. **Use Token to Create New Admin**
   ```json
   POST /admin
   Authorization: Bearer {token}
   {
     "name": "New Admin",
     "email": "newadmin@cupitor.com",
     "password": "AdminPass123!",
     "role": "admin"
   }
   ```

## Authentication Notes

- All admin routes require authentication
- Only `super_admin` can create, update, or delete admins
- Both `super_admin` and `admin` can view admin lists
- Password requirements: minimum 8 characters (recommended to include mixed case, numbers, symbols)
- Passwords are automatically hashed using bcrypt before storage
