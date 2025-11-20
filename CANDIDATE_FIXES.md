# Candidate Module - Bug Fixes

## Issues Fixed

### 1. **Routes** (`candidate.route.ts`)

**Problems:**

- ❌ Missing POST route for candidate registration
- ❌ Missing DELETE route
- ❌ Inconsistent route naming (`/candidates`, `/candidate/:email`, `/candidate-by-id/:id`)
- ❌ Referenced non-existent `getUserByEmail` controller

**Fixes:**

- ✅ Added `POST /` for candidate registration
- ✅ Added `DELETE /:id` with auth middleware
- ✅ Standardized routes: `GET /`, `GET /:id`, `GET /email/:email`
- ✅ Cleaned up route paths to follow modular pattern (base path handled by routes/index.ts)
- ✅ Added `parseBody` middleware for avatar upload

**New Routes:**

```
POST   /candidate          - Create candidate
GET    /candidate          - Get all candidates
GET    /candidate/:id      - Get candidate by ID
GET    /candidate/email/:email - Get candidate by email
PUT    /candidate/:id      - Update candidate (auth required)
PUT    /candidate/avatar/:id - Update avatar (auth required)
DELETE /candidate/:id      - Delete candidate (auth required)
```

---

### 2. **Controller** (`candidate.controller.ts`)

**Problems:**

- ❌ Missing `deleteUser` controller method
- ❌ Avatar upload using local path instead of Cloudinary
- ❌ No file validation for avatar upload
- ❌ Inconsistent success messages ("User" instead of "Candidate")
- ❌ Wrong status code for creation (200 instead of 201)

**Fixes:**

- ✅ Added `deleteUser` controller method
- ✅ Changed avatar path from `/uploads/${file.filename}` to `file.path` (Cloudinary)
- ✅ Added file validation: throws error if avatar file is missing
- ✅ Updated all messages to use "Candidate" instead of "User"
- ✅ Changed creation status code to `httpStatus.CREATED` (201)
- ✅ Removed unused `TImageFile` import

---

### 3. **Service** (`candidate.service.ts`)

**Problems:**

- ❌ Missing `deleteCandidateFromDB` service method
- ❌ Trying to populate non-existent fields: `'following followers'`
- ❌ Missing error handling in update methods
- ❌ Missing error handling in `getCandidateFromDB`

**Fixes:**

- ✅ Added `deleteCandidateFromDB` method
- ✅ Removed invalid `.populate('following followers', '_id name avatar')`
- ✅ Added error handling to all update methods
- ✅ Added error handling to `getCandidateFromDB`
- ✅ All methods now throw proper errors when candidate not found

---

### 4. **Model** (`candidate.model.ts`)

**Problems:**

- ❌ Email not unique (should be unique for login)
- ❌ LinkedIn required (should be optional)
- ❌ City required in type but optional in schema (inconsistency)
- ❌ Education required in type but optional in schema (inconsistency)
- ❌ Skills defined as `Array` instead of `[String]`
- ❌ Missing `isUserExistsByEmail` static method

**Fixes:**

- ✅ Made email unique: `email: { type: String, required: true, unique: true }`
- ✅ Made linkedin optional in both type and schema
- ✅ Made city optional in type definition
- ✅ Made education optional in type definition
- ✅ Changed skills type from `Array` to `[String]` for proper typing
- ✅ Added `isUserExistsByEmail` static method for authentication

---

## Summary of Changes

### Type Definition Updates

```typescript
export type TCandidate = {
  _id: string
  name: string
  email: string // Now unique
  avatar?: string
  password: string
  phone: string
  role: 'candidate'
  city?: string // Now optional
  address?: string
  skills?: string[]
  education?: string // Now optional
  yearsOfExperience?: string
  github?: string
  linkedin?: string // Now optional
}
```

### New Static Methods

```typescript
candidateSchema.statics.isUserExistsByPhone = async function (phone: string)
candidateSchema.statics.isUserExistsByEmail = async function (email: string) // NEW
candidateSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword)
```

### Service Methods

- `createCandidateIntoDb` - ✅ Working
- `getCandidateFromDB` - ✅ Fixed (removed invalid populate)
- `getCandidateByIdFromDB` - ✅ Working
- `updateCandidateIntoDB` - ✅ Fixed (added error handling)
- `updateCandidateAvatarIntoDB` - ✅ Fixed (added error handling)
- `deleteCandidateFromDB` - ✅ **NEW**

### Controller Methods

- `createUser` - ✅ Fixed (status code 201)
- `getAllUser` - ✅ Fixed (message)
- `getUserById` - ✅ Fixed (message)
- `getSingleUser` - ✅ Fixed (message)
- `updateUser` - ✅ Fixed (message)
- `updateUserAvatar` - ✅ Fixed (Cloudinary path, validation)
- `deleteUser` - ✅ **NEW**

---

## Testing Recommendations

1. **Registration**: Test POST `/candidate` with all required fields
2. **Email Uniqueness**: Try creating duplicate emails (should fail)
3. **Phone Uniqueness**: Try creating duplicate phones (should fail)
4. **Avatar Upload**: Test PUT `/candidate/avatar/:id` with file
5. **Optional Fields**: Test registration without linkedin, city, education
6. **Delete**: Test DELETE `/candidate/:id` with auth
7. **Authentication**: Verify `isUserExistsByEmail` works for login

---

## All Bugs Fixed ✅

The candidate module is now fully functional and consistent with the rest of the job portal backend!
