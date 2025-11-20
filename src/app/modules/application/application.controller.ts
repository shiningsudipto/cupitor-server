import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { applicationServices } from './application.service'

const createApplication = catchAsync(async (req, res) => {
  const data = req.body
  const files = req.files as { resume?: Express.Multer.File[] }
  const resume = files?.resume?.[0]?.path

  const payload = {
    ...data,
    ...(resume ? { resume } : {}),
  }

  const result = await applicationServices.createApplicationIntoDB(payload)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Application submitted successfully',
    data: result,
  })
})

const getAllApplications = catchAsync(async (req, res) => {
  const result = await applicationServices.getAllApplicationsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Applications retrieved successfully',
    data: result,
  })
})

const getApplicationById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await applicationServices.getApplicationByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application retrieved successfully',
    data: result,
  })
})

const getApplicationsByCandidate = catchAsync(async (req, res) => {
  const { candidateId } = req.params
  const result =
    await applicationServices.getApplicationsByCandidateFromDB(candidateId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate applications retrieved successfully',
    data: result,
  })
})

const getApplicationsByJob = catchAsync(async (req, res) => {
  const { jobId } = req.params
  const result = await applicationServices.getApplicationsByJobFromDB(jobId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job applications retrieved successfully',
    data: result,
  })
})

const updateApplication = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = req.body
  const result = await applicationServices.updateApplicationIntoDB(id, data)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application updated successfully',
    data: result,
  })
})

const deleteApplication = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await applicationServices.deleteApplicationFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application deleted successfully',
    data: result,
  })
})

export const applicationControllers = {
  createApplication,
  getAllApplications,
  getApplicationById,
  getApplicationsByCandidate,
  getApplicationsByJob,
  updateApplication,
  deleteApplication,
}
