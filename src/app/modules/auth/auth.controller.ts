import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

// Candidate Registration
const registerCandidate = catchAsync(async (req, res) => {
  const result = await AuthServices.registerCandidate(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Candidate registered successfully',
    data: {
      user: result.candidate,
      accessToken: result.accessToken,
    },
  })
})

// Company Registration
const registerCompany = catchAsync(async (req, res) => {
  const result = await AuthServices.registerCompany(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Company registered successfully',
    data: {
      user: result.company,
      accessToken: result.accessToken,
    },
  })
})

// Login (for all user types)
const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: {
      user: result.user,
      accessToken: result.accessToken,
      role: result.role,
    },
  })
})

export const AuthControllers = {
  registerCandidate,
  registerCompany,
  login,
}
