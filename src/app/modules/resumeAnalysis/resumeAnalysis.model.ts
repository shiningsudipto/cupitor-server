import mongoose, { Schema } from 'mongoose'
import { TResumeAnalysis } from './resumeAnalysis.interface'

const resumeAnalysisSchema = new Schema<TResumeAnalysis>(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: 'Resume',
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    parsedContent: {
      type: String,
      required: true,
    },
    analysisType: {
      type: String,
      enum: ['general', 'job-specific'],
      required: true,
      default: 'general',
    },
    title: {
      type: String,
      required: true,
    },
    atsScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    keywordScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    formattingScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    suggestions: {
      type: [String],
      default: [],
    },
    missingKeywords: {
      type: [String],
      default: [],
    },
    matchedKeywords: {
      type: [String],
      default: [],
    },
    sections: {
      hasContactInfo: { type: Boolean, default: false },
      hasExperience: { type: Boolean, default: false },
      hasEducation: { type: Boolean, default: false },
      hasSkills: { type: Boolean, default: false },
      hasSummary: { type: Boolean, default: false },
    },
    aiAnalysis: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const ResumeAnalysis = mongoose.model<TResumeAnalysis>(
  'ResumeAnalysis',
  resumeAnalysisSchema,
)
