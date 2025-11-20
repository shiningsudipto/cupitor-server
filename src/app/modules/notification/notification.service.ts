import { NotificationModel, TNotification } from './notification.model'

const createNotificationIntoDB = async (data: TNotification) => {
  const result = await NotificationModel.create(data)
  return result
}

const getAllNotificationsFromDB = async () => {
  const result = await NotificationModel.find().sort({ createdAt: -1 })
  return result
}

const getNotificationByIdFromDB = async (id: string) => {
  const result = await NotificationModel.findById(id)
  if (!result) {
    throw new Error('Notification not found!')
  }
  return result
}

const getNotificationsByUserFromDB = async (userId: string) => {
  const result = await NotificationModel.find({ userId }).sort({
    createdAt: -1,
  })
  return result
}

const getUnreadNotificationsByUserFromDB = async (userId: string) => {
  const result = await NotificationModel.find({ userId, isRead: false }).sort({
    createdAt: -1,
  })
  return result
}

const markNotificationAsReadIntoDB = async (id: string) => {
  const result = await NotificationModel.findByIdAndUpdate(
    id,
    { isRead: true },
    {
      new: true,
      runValidators: true,
    },
  )
  if (!result) {
    throw new Error('Notification not found!')
  }
  return result
}

const markAllNotificationsAsReadIntoDB = async (userId: string) => {
  const result = await NotificationModel.updateMany(
    { userId, isRead: false },
    { isRead: true },
  )
  return result
}

const deleteNotificationFromDB = async (id: string) => {
  const result = await NotificationModel.findByIdAndDelete(id)
  if (!result) {
    throw new Error('Notification not found!')
  }
  return result
}

export const notificationServices = {
  createNotificationIntoDB,
  getAllNotificationsFromDB,
  getNotificationByIdFromDB,
  getNotificationsByUserFromDB,
  getUnreadNotificationsByUserFromDB,
  markNotificationAsReadIntoDB,
  markAllNotificationsAsReadIntoDB,
  deleteNotificationFromDB,
}
