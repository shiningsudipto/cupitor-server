import { Schema, model, Types } from 'mongoose'

export interface TJobType {
  _id: string
  label: string
}

export interface TJob {
  companyId: Types.ObjectId
  jobType: Types.ObjectId
  title: string
  description: string
  requirements: string
  experience_level: string
  salaryRange?: string
  skills: string[]
  deadline: string
  share_slug: string
}

const JobTypeSchema = new Schema<TJobType>({
  label: { type: String, required: true },
})

const JobSchema = new Schema<TJob>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    jobType: {
      type: Schema.Types.ObjectId,
      ref: 'JobType',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    experience_level: {
      type: String,
      enum: [
        'Internship',
        'Entry-Level',
        'Associate',
        'Mid-Senior Level',
        'Director',
        'Executive',
      ],
      required: true,
    },
    salaryRange: {
      type: String,
    },
    skills: {
      type: [String],
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const JobTypeModel = model<TJobType>('JobType', JobTypeSchema)
export const JobModel = model<TJob>('Job', JobSchema)
