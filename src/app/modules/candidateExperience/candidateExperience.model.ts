import { Schema, model, Types } from 'mongoose'

export interface TCandidateExperience {
  _id?: string
  candidateId: Types.ObjectId
  companyName: string
  companyLocation?: string
  role: string
  description?: string
  startDate: string
  endDate?: string
}

const CandidateExperienceSchema = new Schema<TCandidateExperience>(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyLocation: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export const CandidateExperienceModel = model<TCandidateExperience>(
  'CandidateExperience',
  CandidateExperienceSchema,
)
