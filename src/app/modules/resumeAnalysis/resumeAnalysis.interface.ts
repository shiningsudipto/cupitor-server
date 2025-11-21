import { ObjectId } from 'mongoose'

export interface TResumeAnalysis {
  _id: string
  candidateId: ObjectId
  resumeId?: ObjectId
  jobId?: ObjectId
  resumeUrl: string
  parsedContent: string
  analysisType: 'general' | 'job-specific'
  title: string
  atsScore: number
  keywordScore: number
  formattingScore: number
  overallScore: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  missingKeywords: string[]
  matchedKeywords: string[]
  sections: {
    hasContactInfo: boolean
    hasExperience: boolean
    hasEducation: boolean
    hasSkills: boolean
    hasSummary: boolean
  }
  aiAnalysis: string
  createdAt: Date
  updatedAt: Date
}

export interface TResumeSection {
  hasContactInfo: boolean
  hasExperience: boolean
  hasEducation: boolean
  hasSkills: boolean
  hasSummary: boolean
}

export interface TAIAnalysisResult {
  atsScore: number
  keywordScore: number
  formattingScore: number
  overallScore: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  missingKeywords: string[]
  matchedKeywords: string[]
  sections: TResumeSection
  aiAnalysis: string
}
