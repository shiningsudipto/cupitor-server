import { ObjectId } from 'mongoose'

export type ID = string
export type Timestamp = string
export type JSONValue = any

export interface OrganizationType {
  id: ID
  name: string
}

export interface Company {
  id: ID
  name: string
  slug: string
  email: string
  organizationTypeId: ObjectId
  location: string
  employeeLen: string
  passwordHash: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface JobType {
  id: ID
  name: string
}

export interface Job {
  id: ID
  companyId: ObjectId
  jobTypeId: ObjectId
  title: string
  description: string
  requirements: string
  experienceLevel: string
  salaryRange: string
  skills: JSONValue
  deadline: Timestamp
  shareSlug: string
  createdAt: Timestamp
}

export interface Candidate {
  id: ID
  name: string
  email: string
  slug: string
  phone: string
  avatar: string
  skills: JSONValue
  education: JSONValue
  experienceYears: number
  github: string
  linkedin: string
  passwordHash: string
  createdAt: Timestamp
}

export interface CandidateExperience {
  id: ID
  candidateId: ObjectId
  companyName: string
  companyLocation: string
  role: string
  description: string
  startDate: string
  endDate: string
}

export interface Resume {
  id: ID
  candidateId: ObjectId
  resumeUrl: string
  createdAt: Timestamp
}

export interface SavedJob {
  id: ID
  candidateId: ObjectId
  jobId: ObjectId
  createdAt: Timestamp
}

export interface AppliedJob {
  id: ID
  resumeId: ObjectId
  candidateId: ObjectId
  jobId: ObjectId
  status: string
  createdAt: Timestamp
}

export interface ShortList {
  id: ID
  jobId: ObjectId
  companyId: ObjectId
  candidateId: ObjectId
  createdAt: Timestamp
}

export interface Application {
  id: ID
  jobId: ObjectId
  candidateId: ObjectId
  resumeUrl: string
  coverLetterUrl: string
  parsedResume: JSONValue
  score: number
  status: string
  testScore: number
  createdAt: Timestamp
}
