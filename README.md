# Cupitor - Job Portal Backend

A comprehensive RESTful API backend for a job portal platform built with Node.js, Express, TypeScript, and MongoDB. This system enables companies to post jobs and candidates to search, apply, and manage their job applications.

## 🚀 Features

### For Candidates

- **User Management** - Register, login, update profile with avatar
- **Job Discovery** - Browse and search available jobs
- **Job Applications** - Apply to jobs with resume and cover letter
- **Saved Jobs** - Bookmark jobs for later review
- **Experience Tracking** - Manage work history and experience
- **Resume Management** - Upload and manage multiple resumes
- **Resume ATS Checker** - AI-powered resume analysis and optimization
- **Company Reviews** - Rate and review companies
- **Notifications** - Real-time updates on application status

### For Companies

- **Company Profiles** - Create and manage company information
- **Job Posting** - Post and manage job listings
- **Application Management** - Review candidate applications
- **Candidate Shortlisting** - Shortlist promising candidates
- **Notifications** - Get notified of new applications

### System Features

- **Authentication** - JWT-based secure authentication
- **File Uploads** - Cloudinary integration for resumes and images
- **Password Security** - Bcrypt password hashing
- **Data Validation** - Mongoose schema validation
- **Error Handling** - Centralized error handling
- **TypeScript** - Full type safety throughout the codebase

## 📋 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **File Storage**: Cloudinary
- **File Upload**: Multer
- **Validation**: Zod

## 🔧 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd cupitor-server
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb://localhost:27017/cupitor
BCRYPT_SALT_ROUNDS=10
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

4. **Build the project**

```bash
npm run build
```

5. **Start the server**

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run start:prod
```

## 📚 API Documentation

### Base URL

```
http://localhost:5000
```

## 📞 Support

For questions or issues, please refer to:

- [API Examples](./EXAMPLE.md) - Complete API documentation with test data
- [Development Guide](./GEMINI.md) - Code patterns and guidelines

---

**Built with ❤️ for connecting talent with opportunity**
