import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { resumeServices } from './resume.service'

const createResume = catchAsync(async (req, res) => {
  const data = req.body
  const files = req.files as { resume?: Express.Multer.File[] }
  const resumeUrl = files?.resume?.[0]?.path

  const payload = {
    ...data,
    resumeUrl: resumeUrl || data.resumeUrl,
  }

  const result = await resumeServices.createResumeIntoDB(payload)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Resume uploaded successfully',
    data: result,
  })
})

const getAllResumes = catchAsync(async (req, res) => {
  const result = await resumeServices.getAllResumesFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resumes retrieved successfully',
    data: result,
  })
})

const getResumeById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await resumeServices.getResumeByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume retrieved successfully',
    data: result,
  })
})

const getResumesByCandidate = catchAsync(async (req, res) => {
  const { candidateId } = req.params
  const result = await resumeServices.getResumesByCandidateFromDB(candidateId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate resumes retrieved successfully',
    data: result,
  })
})

const updateResume = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = req.body
  const files = req.files as { resume?: Express.Multer.File[] }
  const resumeUrl = files?.resume?.[0]?.path

  const payload = {
    ...data,
    ...(resumeUrl ? { resumeUrl } : {}),
  }

  const result = await resumeServices.updateResumeIntoDB(id, payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume updated successfully',
    data: result,
  })
})

const deleteResume = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await resumeServices.deleteResumeFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume deleted successfully',
    data: result,
  })
})

export const resumeControllers = {
  createResume,
  getAllResumes,
  getResumeById,
  getResumesByCandidate,
  updateResume,
  deleteResume,
}
