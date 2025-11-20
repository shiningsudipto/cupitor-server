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

## 📁 Project Structure

```
cupitor-server/
├── src/
│   ├── app/
│   │   ├── config/          # Configuration files
│   │   ├── middlewares/     # Custom middlewares
│   │   ├── modules/         # Feature modules
│   │   │   ├── candidate/   # Candidate management
│   │   │   ├── company/     # Company management
│   │   │   ├── job/         # Job postings
│   │   │   ├── application/ # Job applications
│   │   │   ├── savedJob/    # Saved jobs
│   │   │   ├── review/      # Company reviews
│   │   │   ├── notification/# Notifications
│   │   │   ├── candidateExperience/ # Work experience
│   │   │   ├── resume/      # Resume management
│   │   │   └── shortList/   # Candidate shortlisting
│   │   ├── routes/          # Route definitions
│   │   └── utils/           # Utility functions
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
├── EXAMPLE.md               # API examples & test data
├── GEMINI.md                # Development guidelines
└── README.md                # This file
```

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

### Available Modules

| Module        | Base Path              | Description                           |
| ------------- | ---------------------- | ------------------------------------- |
| Candidates    | `/candidate`           | Candidate registration and management |
| Companies     | `/company`             | Company profiles and management       |
| Jobs          | `/job`                 | Job postings and listings             |
| Applications  | `/application`         | Job application submissions           |
| Saved Jobs    | `/savedJob`            | Bookmark jobs                         |
| Reviews       | `/review`              | Company reviews and ratings           |
| Notifications | `/notification`        | System notifications                  |
| Experience    | `/candidateExperience` | Work experience tracking              |
| Resumes       | `/resume`              | Resume uploads and management         |
| ShortList     | `/shortList`           | Candidate shortlisting                |
| Auth          | `/auth`                | Authentication endpoints              |

### Quick Start Examples

**Create a Candidate:**

```bash
POST /candidate
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890"
}
```

**Create a Job:**

```bash
POST /job
Content-Type: application/json

{
  "companyId": "company_id_here",
  "jobType": "job_type_id_here",
  "title": "Senior Developer",
  "description": "Job description...",
  "requirements": "5+ years experience",
  "experience_level": "Mid-Senior Level",
  "skills": ["JavaScript", "React", "Node.js"],
  "deadline": "2024-12-31"
}
```

**📖 For complete API documentation with all endpoints and examples, see [EXAMPLE.md](./EXAMPLE.md)**

## 🛠️ Development Guidelines

This project follows a modular architecture pattern. Each feature module contains:

- **Model** - Mongoose schema and types
- **Service** - Business logic layer
- **Controller** - Request/response handling
- **Routes** - API endpoint definitions

**📖 For detailed development guidelines and code patterns, see [GEMINI.md](./GEMINI.md)**

## 🗂️ Database Models

### Core Models

- **Candidate** - User profiles for job seekers
- **Company** - Company profiles and information
- **Job** - Job postings with requirements
- **Application** - Job application submissions
- **SavedJob** - Bookmarked jobs by candidates
- **Review** - Company reviews and ratings
- **Notification** - System notifications
- **CandidateExperience** - Work history
- **Resume** - Resume files and metadata
- **ShortList** - Shortlisted candidates

### Supporting Models

- **CompanyType** - Organization type categories
- **JobType** - Employment type (Full-time, Part-time, etc.)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles

- `candidate` - Job seekers
- `company` - Employers
- `admin` - System administrators

## 📝 Scripts

```bash
# Development
npm run start:dev      # Start development server with hot reload

# Production
npm run build          # Compile TypeScript to JavaScript
npm run start:prod     # Start production server

# Code Quality
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint errors
npm run prettier       # Format code with Prettier
npm run prettier:fix   # Fix formatting issues
```

## 🧪 Testing

Test all endpoints using the examples in [EXAMPLE.md](./EXAMPLE.md). Recommended tools:

- **Postman** - Full-featured API testing
- **Thunder Client** - VS Code extension
- **Insomnia** - Alternative API client

## 📦 Key Dependencies

| Package      | Purpose               |
| ------------ | --------------------- |
| express      | Web framework         |
| mongoose     | MongoDB ODM           |
| typescript   | Type safety           |
| bcrypt       | Password hashing      |
| jsonwebtoken | JWT authentication    |
| multer       | File uploads          |
| cloudinary   | Cloud storage         |
| zod          | Schema validation     |
| cors         | Cross-origin requests |

## 🤝 Contributing

1. Follow the code patterns in [GEMINI.md](./GEMINI.md)
2. Maintain the modular structure
3. Add proper TypeScript types
4. Include error handling
5. Update documentation

## 📄 License

ISC

## 📞 Support

For questions or issues, please refer to:

- [API Examples](./EXAMPLE.md) - Complete API documentation with test data
- [Development Guide](./GEMINI.md) - Code patterns and guidelines

---

**Built with ❤️ for connecting talent with opportunity**
