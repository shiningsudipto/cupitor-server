/* eslint-disable @typescript-eslint/no-explicit-any */
import { candidateServices } from './candidate.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { Candidate } from './candidate.model'

const createUser = catchAsync(async (req, res) => {
  const payload = req.body

  const result = await candidateServices.createCandidateIntoDb(payload)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Candidate registered successfully',
    data: result,
  })
})

const getAllUser = catchAsync(async (req, res) => {
  const result = await Candidate.find()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidates retrieved successfully',
    data: result,
  })
})

const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await candidateServices.getCandidateByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate retrieved successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const { email } = req.params
  const result = await candidateServices.getCandidateFromDB(email)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate retrieved successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const result = await candidateServices.updateCandidateIntoDB(id, payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate updated successfully',
    data: result,
  })
})

const updateUserAvatar = catchAsync(async (req, res) => {
  const { id } = req.params
  const file = req.file as any

  if (!file) {
    throw new Error('Avatar file is required')
  }

  const payload = {
    avatar: file.path, // Cloudinary path
  }

  const result = await candidateServices.updateCandidateAvatarIntoDB(
    id,
    payload,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Avatar updated successfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await candidateServices.deleteCandidateFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate deleted successfully',
    data: result,
  })
})

export const userControllers = {
  createUser,
  getAllUser,
  getUserById,
  getSingleUser,
  updateUser,
  updateUserAvatar,
  deleteUser,
}
