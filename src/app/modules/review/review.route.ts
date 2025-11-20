import express from 'express'
import { reviewControllers } from './review.controller'

const router = express.Router()

router.post('/', reviewControllers.createReview)
router.get('/', reviewControllers.getAllReviews)
router.get('/:id', reviewControllers.getReviewById)
router.get('/company/:companyId', reviewControllers.getReviewsByCompany)
router.get('/candidate/:candidateId', reviewControllers.getReviewsByCandidate)
router.put('/:id', reviewControllers.updateReview)
router.delete('/:id', reviewControllers.deleteReview)

export const ReviewRoutes = router
