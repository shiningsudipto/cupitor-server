import express from 'express'
import auth from '../../middlewares/auth'
import { userControllers } from './candidate.controller'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middlewares/bodyParser'
import { USER_ROLE } from './candidate.model'

const router = express.Router()

router.post('/', userControllers.createUser)
router.get('/', userControllers.getAllUser)
router.get('/:id', userControllers.getUserById)
router.get('/slug/:slug', userControllers.getBySlug)
router.get('/email/:email', userControllers.getSingleUser)
router.put(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.candidate),
  userControllers.updateUser,
)
router.put(
  '/avatar/:id',
  auth(USER_ROLE.admin, USER_ROLE.candidate),
  multerUpload.single('avatar'),
  parseBody,
  userControllers.updateUserAvatar,
)
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.candidate),
  userControllers.deleteUser,
)

export const UserRoutes = router
