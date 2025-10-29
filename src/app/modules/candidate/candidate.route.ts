import express from 'express'
import auth from '../../middlewares/auth'
import { userControllers } from './candidate.controller'
import { multerUpload } from '../../config/multer.config'
import { USER_ROLE } from './candidate.model'

const router = express.Router()

router.get('/users', auth(USER_ROLE.admin), userControllers.getAllUser)
router.get('/user-info', userControllers.getUserByEmail)
router.get('/user/:email', userControllers.getSingleUser)
router.get('/user-by-id/:id', userControllers.getUserById)

router.put(
  '/update-user/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userControllers.updateUser,
)
router.put(
  '/update-user-avatar/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  multerUpload.single('avatar'),
  userControllers.updateUserAvatar,
)
router.put(
  '/update-user-role/:id',
  auth(USER_ROLE.admin),
  auth(USER_ROLE.admin),
  userControllers.updateUserRole,
)

export const UserRoutes = router
