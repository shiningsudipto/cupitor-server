import express from 'express'
import { shortListControllers } from './shortList.controller'

const router = express.Router()

router.post('/', shortListControllers.createShortList)
router.get('/', shortListControllers.getAllShortLists)
router.get('/:id', shortListControllers.getShortListById)
router.get('/job/:jobId', shortListControllers.getShortListsByJob)
router.get('/company/:companyId', shortListControllers.getShortListsByCompany)
router.get(
  '/candidate/:candidateId',
  shortListControllers.getShortListsByCandidate,
)
router.delete('/:id', shortListControllers.deleteShortList)

export const ShortListRoutes = router
