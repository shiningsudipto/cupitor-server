import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { reviewServices } from './review.service'

const createReview = catchAsync(async (req, res) => {
  const data = req.body
  const result = await reviewServices.createReviewIntoDB(data)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review created successfully',
    data: result,
  })
})

const getAllReviews = catchAsync(async (req, res) => {
  const result = await reviewServices.getAllReviewsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully',
    data: result,
  })
})

const getReviewById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await reviewServices.getReviewByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully',
    data: result,
  })
})

const getReviewsByCompany = catchAsync(async (req, res) => {
  const { companyId } = req.params
  const result = await reviewServices.getReviewsByCompanyFromDB(companyId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company reviews retrieved successfully',
    data: result,
  })
})

const getReviewsByCandidate = catchAsync(async (req, res) => {
  const { candidateId } = req.params
  const result = await reviewServices.getReviewsByCandidateFromDB(candidateId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate reviews retrieved successfully',
    data: result,
  })
})

const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = req.body
  const result = await reviewServices.updateReviewIntoDB(id, data)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  })
})

const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await reviewServices.deleteReviewFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  })
})

export const reviewControllers = {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsByCompany,
  getReviewsByCandidate,
  updateReview,
  deleteReview,
}
