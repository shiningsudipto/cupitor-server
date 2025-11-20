import express from 'express'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middlewares/bodyParser'
import { resumeControllers } from './resume.controller'

const router = express.Router()

router.post(
  '/',
  multerUpload.fields([{ name: 'resume' }]),
  parseBody,
  resumeControllers.createResume,
)
router.get('/', resumeControllers.getAllResumes)
router.get('/:id', resumeControllers.getResumeById)
router.get('/candidate/:candidateId', resumeControllers.getResumesByCandidate)
router.put(
  '/:id',
  multerUpload.fields([{ name: 'resume' }]),
  parseBody,
  resumeControllers.updateResume,
)
router.delete('/:id', resumeControllers.deleteResume)

export const ResumeRoutes = router
