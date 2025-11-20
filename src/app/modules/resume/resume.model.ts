import { Schema, model, Types } from 'mongoose'

export interface TResume {
  _id?: string
  candidateId: Types.ObjectId
  resumeUrl: string
  createdAt?: Date
}

const ResumeSchema = new Schema<TResume>(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const ResumeModel = model<TResume>('Resume', ResumeSchema)
