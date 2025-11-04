import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

// const loginUser = catchAsync(async (req, res) => {
//   const result = await AuthServices.loginUser(req.body)
//   const { accessToken } = result

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User logged in successfully',
//     accessToken: accessToken,
//     data: '',
//   })
// })

// export const AuthControllers = {
//   loginUser,
// }
