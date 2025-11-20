import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { adminServices } from './admin.service'

const createAdmin = catchAsync(async (req, res) => {
  const result = await adminServices.createAdmin(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully',
    data: result,
  })
})

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await adminServices.getAllAdmins()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins retrieved successfully',
    data: result,
  })
})

const getAdminById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await adminServices.getAdminById(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  })
})

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await adminServices.updateAdmin(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  })
})

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await adminServices.deleteAdmin(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  })
})

export const adminControllers = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
}
