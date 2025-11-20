import express from 'express'
import { savedJobControllers } from './savedJob.controller'

const router = express.Router()

router.post('/', savedJobControllers.createSavedJob)
router.get('/', savedJobControllers.getAllSavedJobs)
router.get('/:id', savedJobControllers.getSavedJobById)
router.get(
  '/candidate/:candidateId',
  savedJobControllers.getSavedJobsByCandidate,
)
router.delete('/:id', savedJobControllers.deleteSavedJob)
router.post('/unsave', savedJobControllers.unsaveJob)

export const SavedJobRoutes = router
