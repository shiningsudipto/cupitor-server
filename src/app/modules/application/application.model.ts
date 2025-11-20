import { Schema, model, Types } from 'mongoose'

export interface TApplication {
  _id?: string
  jobId: Types.ObjectId
  candidateId: Types.ObjectId
  coverLetter?: string
  resume?: string
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted'
  appliedAt?: Date
}

const ApplicationSchema = new Schema<TApplication>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverLetter: {
      type: String,
    },
    resume: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'],
      default: 'pending',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Compound index to prevent duplicate applications
ApplicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true })

export const ApplicationModel = model<TApplication>(
  'Application',
  ApplicationSchema,
)
