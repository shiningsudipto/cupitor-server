import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { savedJobServices } from './savedJob.service'

const createSavedJob = catchAsync(async (req, res) => {
  const data = req.body
  const result = await savedJobServices.createSavedJobIntoDB(data)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Job saved successfully',
    data: result,
  })
})

const getAllSavedJobs = catchAsync(async (req, res) => {
  const result = await savedJobServices.getAllSavedJobsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Saved jobs retrieved successfully',
    data: result,
  })
})

const getSavedJobById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await savedJobServices.getSavedJobByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Saved job retrieved successfully',
    data: result,
  })
})

const getSavedJobsByCandidate = catchAsync(async (req, res) => {
  const { candidateId } = req.params
  const result =
    await savedJobServices.getSavedJobsByCandidateFromDB(candidateId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate saved jobs retrieved successfully',
    data: result,
  })
})

const deleteSavedJob = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await savedJobServices.deleteSavedJobFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Saved job removed successfully',
    data: result,
  })
})

const unsaveJob = catchAsync(async (req, res) => {
  const { jobId, candidateId } = req.body
  const result = await savedJobServices.deleteSavedJobByJobAndCandidateFromDB(
    jobId,
    candidateId,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job unsaved successfully',
    data: result,
  })
})

export const savedJobControllers = {
  createSavedJob,
  getAllSavedJobs,
  getSavedJobById,
  getSavedJobsByCandidate,
  deleteSavedJob,
  unsaveJob,
}
