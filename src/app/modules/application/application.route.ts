import express from 'express'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middlewares/bodyParser'
import { applicationControllers } from './application.controller'

const router = express.Router()

router.post(
  '/',
  multerUpload.fields([{ name: 'resume' }]),
  parseBody,
  applicationControllers.createApplication,
)
router.get('/', applicationControllers.getAllApplications)
router.get('/:id', applicationControllers.getApplicationById)
router.get(
  '/candidate/:candidateId',
  applicationControllers.getApplicationsByCandidate,
)
router.get('/job/:jobId', applicationControllers.getApplicationsByJob)
router.put('/:id', applicationControllers.updateApplication)
router.delete('/:id', applicationControllers.deleteApplication)

export const ApplicationRoutes = router
