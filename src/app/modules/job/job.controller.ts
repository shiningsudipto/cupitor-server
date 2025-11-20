import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { jobServices } from './job.service'

const createJob = catchAsync(async (req, res) => {
  const data = req.body
  const result = await jobServices.createJobIntoDB(data)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Job created successfully',
    data: result,
  })
})

const getAllJobs = catchAsync(async (req, res) => {
  const result = await jobServices.getAllJobsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Jobs retrieved successfully',
    data: result,
  })
})

const getJobById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await jobServices.getJobByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job retrieved successfully',
    data: result,
  })
})

const getJobsByCompany = catchAsync(async (req, res) => {
  const { companyId } = req.params
  const result = await jobServices.getJobsByCompanyFromDB(companyId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company jobs retrieved successfully',
    data: result,
  })
})

const updateJob = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = req.body
  const result = await jobServices.updateJobIntoDB(id, data)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job updated successfully',
    data: result,
  })
})

const deleteJob = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await jobServices.deleteJobFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job deleted successfully',
    data: result,
  })
})

const createJobType = catchAsync(async (req, res) => {
  const result = await jobServices.createJobTypeIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Job type created successfully',
    data: result,
  })
})

const getAllJobTypes = catchAsync(async (req, res) => {
  const result = await jobServices.getAllJobTypesFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job types retrieved successfully',
    data: result,
  })
})

export const jobControllers = {
  createJob,
  getAllJobs,
  getJobById,
  getJobsByCompany,
  updateJob,
  deleteJob,
  createJobType,
  getAllJobTypes,
}
