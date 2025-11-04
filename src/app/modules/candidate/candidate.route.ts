import express from 'express'
import auth from '../../middlewares/auth'
import { userControllers } from './candidate.controller'
import { multerUpload } from '../../config/multer.config'
import { USER_ROLE } from './candidate.model'

const router = express.Router()

router.get('/candidates', userControllers.getAllUser)
router.get('/candidate-info', userControllers.getUserByEmail)
router.get('/candidate/:email', userControllers.getSingleUser)
router.get('/candidate-by-id/:id', userControllers.getUserById)

router.put(
  '/update-candidate/:id',
  auth(USER_ROLE.admin, USER_ROLE.candidate),
  userControllers.updateUser,
)
router.put(
  '/update-candidate-avatar/:id',
  auth(USER_ROLE.admin, USER_ROLE.candidate),
  multerUpload.single('avatar'),
  userControllers.updateUserAvatar,
)

export const UserRoutes = router
