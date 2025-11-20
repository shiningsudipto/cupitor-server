import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { candidateExperienceServices } from './candidateExperience.service'

const createCandidateExperience = catchAsync(async (req, res) => {
  const data = req.body
  const result =
    await candidateExperienceServices.createCandidateExperienceIntoDB(data)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Candidate experience created successfully',
    data: result,
  })
})

const getAllCandidateExperiences = catchAsync(async (req, res) => {
  const result =
    await candidateExperienceServices.getAllCandidateExperiencesFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate experiences retrieved successfully',
    data: result,
  })
})

const getCandidateExperienceById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await candidateExperienceServices.getCandidateExperienceByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate experience retrieved successfully',
    data: result,
  })
})

const getCandidateExperiencesByCandidate = catchAsync(async (req, res) => {
  const { candidateId } = req.params
  const result =
    await candidateExperienceServices.getCandidateExperiencesByCandidateFromDB(
      candidateId,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate experiences retrieved successfully',
    data: result,
  })
})

const updateCandidateExperience = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = req.body
  const result =
    await candidateExperienceServices.updateCandidateExperienceIntoDB(id, data)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate experience updated successfully',
    data: result,
  })
})

const deleteCandidateExperience = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await candidateExperienceServices.deleteCandidateExperienceFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate experience deleted successfully',
    data: result,
  })
})

export const candidateExperienceControllers = {
  createCandidateExperience,
  getAllCandidateExperiences,
  getCandidateExperienceById,
  getCandidateExperiencesByCandidate,
  updateCandidateExperience,
  deleteCandidateExperience,
}
