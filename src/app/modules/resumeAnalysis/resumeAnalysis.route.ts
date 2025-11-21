import express from 'express'
import { multerUpload } from '../../config/multer.config'
import { resumeAnalysisControllers } from './resumeAnalysis.controller'
import { parseBody } from '../../middlewares/bodyParser'

const router = express.Router()

// Analyze resume - general ATS analysis
router.post(
  '/analyze',
  multerUpload.fields([{ name: 'resume' }]),
  resumeAnalysisControllers.analyzeResume,
)

// Analyze resume for specific job
router.post('/analyze-for-job', resumeAnalysisControllers.analyzeResumeForJob)

// Get all analyses
router.get('/', resumeAnalysisControllers.getAllAnalyses)

// Get analysis by ID
router.get('/:id', resumeAnalysisControllers.getAnalysisById)

// Get candidate's analyses
router.get(
  '/candidate/:candidateId',
  resumeAnalysisControllers.getCandidateAnalyses,
)

// Delete analysis
router.delete('/:id', resumeAnalysisControllers.deleteAnalysis)

// Update analysis title
router.put('/:id/title', parseBody, resumeAnalysisControllers.updateTitle)

export const ResumeAnalysisRoutes = router
