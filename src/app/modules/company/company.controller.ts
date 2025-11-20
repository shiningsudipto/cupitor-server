import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { Company, TCompany } from './company.model'
import { companyServices } from './company.service'

const create = catchAsync(async (req, res) => {
  const data = req.body
  const files = req.files as { logo?: Express.Multer.File[] }
  const logo = files?.logo?.[0]?.path

  const payload: TCompany = {
    ...data,
    logo: logo,
  }

  const result = await companyServices.createCompanyIntoDb(payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company registered successfully',
    data: result,
  })
})

const getAll = catchAsync(async (req, res) => {
  const result = await Company.find()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
})

const getByUsername = catchAsync(async (req, res) => {
  const { username } = req.params
  const result = await companyServices.getCompanyFromDB(username)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company retrieved successfully',
    data: result,
  })
})

const getById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await companyServices.getCompanyByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company retrieved successfully',
    data: result,
  })
})

const update = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = req.body
  const files = req.files as { logo?: Express.Multer.File[] }
  const logo = files?.logo?.[0]?.path

  const payload: Partial<TCompany> = {
    ...data,
    ...(logo ? { logo } : {}), // Only include avatar if it exists
  }
  const result = await companyServices.updateCompanyIntoDB(id, payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company updated successfully',
    data: result,
  })
})

const deleteCompany = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await companyServices.deleteCompanyFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company retrieved successfully',
    data: result,
  })
})

const createCompanyType = catchAsync(async (req, res) => {
  const result = await companyServices.createCompanyTypeIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company type created successfully',
    data: result,
  })
})

const getAllCompanyTypes = catchAsync(async (req, res) => {
  const result = await companyServices.getAllCompanyTypesFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company types retrieved successfully',
    data: result,
  })
})

export const companyControllers = {
  create,
  getAll,
  getById,
  getByUsername,
  update,
  deleteCompany,
  createCompanyType,
  getAllCompanyTypes,
}
