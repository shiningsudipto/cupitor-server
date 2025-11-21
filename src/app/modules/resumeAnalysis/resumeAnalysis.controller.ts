import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { resumeAnalysisServices } from './resumeAnalysis.service'

/**
 * Analyze resume - General ATS analysis
 * POST /resumeAnalysis/analyze
 */
const analyzeResume = catchAsync(async (req, res) => {
  console.log('route hit')
  const { candidateId, resumeId } = req.body
  const files = req.files as { resume?: Express.Multer.File[] }
  const resumeFile = files?.resume?.[0]

  if (!resumeFile) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Resume file is required',
    })
  }

  // Get file path (local or Cloudinary URL)
  const filePath = resumeFile.path

  // For storage, use Cloudinary URL if available, otherwise use filename
  const resumeUrl = resumeFile.path.startsWith('http')
    ? resumeFile.path
    : `/uploads/${resumeFile.filename}`

  const result = await resumeAnalysisServices.analyzeResumeFromPDF(
    candidateId,
    filePath,
    resumeUrl,
    resumeId,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume analyzed successfully',
    data: result,
  })
})

/**
 * Analyze resume for specific job
 * POST /resumeAnalysis/analyze-for-job
 */
const analyzeResumeForJob = catchAsync(async (req, res) => {
  const { candidateId, jobId, resumeAnalysisId } = req.body

  // If resumeAnalysisId is provided, use existing analysis
  if (resumeAnalysisId) {
    const result =
      await resumeAnalysisServices.analyzeResumeForJobFromExistingAnalysis(
        candidateId,
        jobId,
        resumeAnalysisId,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Resume analyzed for job successfully',
      data: result,
    })
    return
  }
})

/**
 * Get all analyses
 * GET /resumeAnalysis
 */
const getAllAnalyses = catchAsync(async (req, res) => {
  const result = await resumeAnalysisServices.getAllAnalyses()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume analyses retrieved successfully',
    data: result,
  })
})

/**
 * Get analysis by ID
 * GET /resumeAnalysis/:id
 */
const getAnalysisById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await resumeAnalysisServices.getAnalysisById(id)

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Resume analysis not found',
    })
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume analysis retrieved successfully',
    data: result,
  })
})

/**
 * Get candidate's analyses
 * GET /resumeAnalysis/candidate/:candidateId
 */
const getCandidateAnalyses = catchAsync(async (req, res) => {
  const { candidateId } = req.params
  const result = await resumeAnalysisServices.getCandidateAnalyses(candidateId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate resume analyses retrieved successfully',
    data: result,
  })
})

/**
 * Delete analysis
 * DELETE /resumeAnalysis/:id
 */
const deleteAnalysis = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await resumeAnalysisServices.deleteAnalysis(id)

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Resume analysis not found',
    })
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume analysis deleted successfully',
    data: result,
  })
})

export const resumeAnalysisControllers = {
  analyzeResume,
  analyzeResumeForJob,
  getAllAnalyses,
  getAnalysisById,
  getCandidateAnalyses,
  deleteAnalysis,
}
