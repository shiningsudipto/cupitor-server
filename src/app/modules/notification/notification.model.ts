import { Schema, model, Types } from 'mongoose'

export interface TNotification {
  _id?: string
  userId: Types.ObjectId
  userType: 'candidate' | 'company'
  title: string
  message: string
  type: 'application' | 'job' | 'review' | 'general'
  isRead: boolean
  relatedId?: Types.ObjectId
  createdAt?: Date
}

const NotificationSchema = new Schema<TNotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'userType',
    },
    userType: {
      type: String,
      required: true,
      enum: ['candidate', 'company'],
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['application', 'job', 'review', 'general'],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    relatedId: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
)

export const NotificationModel = model<TNotification>(
  'Notification',
  NotificationSchema,
)
