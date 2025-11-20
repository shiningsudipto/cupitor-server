import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { shortListServices } from './shortList.service'

const createShortList = catchAsync(async (req, res) => {
  const data = req.body
  const result = await shortListServices.createShortListIntoDB(data)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Candidate shortlisted successfully',
    data: result,
  })
})

const getAllShortLists = catchAsync(async (req, res) => {
  const result = await shortListServices.getAllShortListsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ShortLists retrieved successfully',
    data: result,
  })
})

const getShortListById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await shortListServices.getShortListByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ShortList retrieved successfully',
    data: result,
  })
})

const getShortListsByJob = catchAsync(async (req, res) => {
  const { jobId } = req.params
  const result = await shortListServices.getShortListsByJobFromDB(jobId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job shortlists retrieved successfully',
    data: result,
  })
})

const getShortListsByCompany = catchAsync(async (req, res) => {
  const { companyId } = req.params
  const result = await shortListServices.getShortListsByCompanyFromDB(companyId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company shortlists retrieved successfully',
    data: result,
  })
})

const getShortListsByCandidate = catchAsync(async (req, res) => {
  const { candidateId } = req.params
  const result =
    await shortListServices.getShortListsByCandidateFromDB(candidateId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate shortlists retrieved successfully',
    data: result,
  })
})

const deleteShortList = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await shortListServices.deleteShortListFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ShortList removed successfully',
    data: result,
  })
})

export const shortListControllers = {
  createShortList,
  getAllShortLists,
  getShortListById,
  getShortListsByJob,
  getShortListsByCompany,
  getShortListsByCandidate,
  deleteShortList,
}
