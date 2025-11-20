import express from 'express'
import { candidateExperienceControllers } from './candidateExperience.controller'

const router = express.Router()

router.post('/', candidateExperienceControllers.createCandidateExperience)
router.get('/', candidateExperienceControllers.getAllCandidateExperiences)
router.get('/:id', candidateExperienceControllers.getCandidateExperienceById)
router.get(
  '/candidate/:candidateId',
  candidateExperienceControllers.getCandidateExperiencesByCandidate,
)
router.put('/:id', candidateExperienceControllers.updateCandidateExperience)
router.delete('/:id', candidateExperienceControllers.deleteCandidateExperience)

export const CandidateExperienceRoutes = router
