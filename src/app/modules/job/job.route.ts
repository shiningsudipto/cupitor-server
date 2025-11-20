import express from 'express'
import { jobControllers } from './job.controller'

const router = express.Router()

router.post('/', jobControllers.createJob)
router.get('/', jobControllers.getAllJobs)

router.post('/job-type', jobControllers.createJobType)
router.get('/job-type', jobControllers.getAllJobTypes)
router.get('/:id', jobControllers.getJobById)
router.get('/company/:companyId', jobControllers.getJobsByCompany)
router.put('/:id', jobControllers.updateJob)
router.delete('/:id', jobControllers.deleteJob)

export const JobRoutes = router
