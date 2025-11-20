import { Schema, model, Types } from 'mongoose'

export interface TReview {
  _id?: string
  companyId: Types.ObjectId
  candidateId: Types.ObjectId
  rating: number
  comment?: string
  reviewDate?: Date
}

const ReviewSchema = new Schema<TReview>(
  {
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
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
    reviewDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Compound index to prevent duplicate reviews
ReviewSchema.index({ companyId: 1, candidateId: 1 }, { unique: true })

export const ReviewModel = model<TReview>('Review', ReviewSchema)
