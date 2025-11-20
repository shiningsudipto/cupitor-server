import { Schema, model, Types } from 'mongoose'

export interface TSavedJob {
  _id?: string
  jobId: Types.ObjectId
  candidateId: Types.ObjectId
  savedAt?: Date
}

const SavedJobSchema = new Schema<TSavedJob>(
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
    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Compound index to prevent duplicate saved jobs
SavedJobSchema.index({ jobId: 1, candidateId: 1 }, { unique: true })

export const SavedJobModel = model<TSavedJob>('SavedJob', SavedJobSchema)
