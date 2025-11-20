import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { notificationServices } from './notification.service'

const createNotification = catchAsync(async (req, res) => {
  const data = req.body
  const result = await notificationServices.createNotificationIntoDB(data)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Notification created successfully',
    data: result,
  })
})

const getAllNotifications = catchAsync(async (req, res) => {
  const result = await notificationServices.getAllNotificationsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notifications retrieved successfully',
    data: result,
  })
})

const getNotificationById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await notificationServices.getNotificationByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification retrieved successfully',
    data: result,
  })
})

const getNotificationsByUser = catchAsync(async (req, res) => {
  const { userId } = req.params
  const result = await notificationServices.getNotificationsByUserFromDB(userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User notifications retrieved successfully',
    data: result,
  })
})

const getUnreadNotificationsByUser = catchAsync(async (req, res) => {
  const { userId } = req.params
  const result =
    await notificationServices.getUnreadNotificationsByUserFromDB(userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unread notifications retrieved successfully',
    data: result,
  })
})

const markNotificationAsRead = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await notificationServices.markNotificationAsReadIntoDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification marked as read',
    data: result,
  })
})

const markAllNotificationsAsRead = catchAsync(async (req, res) => {
  const { userId } = req.params
  const result =
    await notificationServices.markAllNotificationsAsReadIntoDB(userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All notifications marked as read',
    data: result,
  })
})

const deleteNotification = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await notificationServices.deleteNotificationFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification deleted successfully',
    data: result,
  })
})

export const notificationControllers = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  getNotificationsByUser,
  getUnreadNotificationsByUser,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
}
