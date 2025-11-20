import express from 'express'
import { notificationControllers } from './notification.controller'

const router = express.Router()

router.post('/', notificationControllers.createNotification)
router.get('/', notificationControllers.getAllNotifications)
router.get('/:id', notificationControllers.getNotificationById)
router.get('/user/:userId', notificationControllers.getNotificationsByUser)
router.get(
  '/user/:userId/unread',
  notificationControllers.getUnreadNotificationsByUser,
)
router.put('/:id/read', notificationControllers.markNotificationAsRead)
router.put(
  '/user/:userId/read-all',
  notificationControllers.markAllNotificationsAsRead,
)
router.delete('/:id', notificationControllers.deleteNotification)

export const NotificationRoutes = router
