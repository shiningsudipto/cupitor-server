import { Schema, model, Types } from 'mongoose'

export interface TShortList {
  _id?: string
  jobId: Types.ObjectId
  companyId: Types.ObjectId
  candidateId: Types.ObjectId
  createdAt?: Date
}

const ShortListSchema = new Schema<TShortList>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Compound index to prevent duplicate shortlists
ShortListSchema.index(
  { jobId: 1, companyId: 1, candidateId: 1 },
  { unique: true },
)

export const ShortListModel = model<TShortList>('ShortList', ShortListSchema)
