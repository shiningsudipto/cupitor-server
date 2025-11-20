import httpStatus from 'http-status'
import config from '../../config'
import { Candidate } from '../candidate/candidate.model'
import { Company } from '../company/company.model'
import { Admin } from '../admin/admin.model'
import { createToken } from './auth.utils'

// Candidate Registration
const registerCandidate = async (payload: any) => {
  // Check if candidate already exists
  const existingCandidate = await Candidate.isUserExistsByEmail(payload.email)
  if (existingCandidate) {
    throw new Error('Candidate with this email already exists')
  }

  const existingPhone = await Candidate.isUserExistsByPhone(payload.phone)
  if (existingPhone) {
    throw new Error('Candidate with this phone number already exists')
  }

  // Create candidate (password will be hashed in pre-save hook)
  const candidate = await Candidate.create(payload)

  // Generate JWT token
  const jwtPayload = {
    userId: candidate._id.toString(),
    role: 'candidate',
    email: candidate.email,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    candidate,
    accessToken,
  }
}

// Company Registration
const registerCompany = async (payload: any) => {
  // Check if company already exists
  const existingCompany = await Company.findOne({ email: payload.email })
  if (existingCompany) {
    throw new Error('Company with this email already exists')
  }

  const existingUsername = await Company.findOne({
    username: payload.username,
  })
  if (existingUsername) {
    throw new Error('Company with this username already exists')
  }

  // Create company (password will be hashed in pre-save hook)
  const company = await Company.create(payload)

  // Generate JWT token
  const jwtPayload = {
    userId: company._id.toString(),
    role: 'company',
    email: company.email,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    company,
    accessToken,
  }
}

// Login for all user types (candidate, company, admin)
const login = async (payload: { email: string; password: string }) => {
  const { email, password } = payload

  let user: any = null
  let role = ''
  let isPasswordMatched = false

  // Try to find user in Candidate collection
  user = await Candidate.isUserExistsByEmail(email)
  if (user) {
    role = 'candidate'
    isPasswordMatched = await Candidate.isPasswordMatched(
      password,
      user.password,
    )
  }

  // If not found, try Company collection
  if (!user) {
    user = await Company.findOne({ email }).select('+password')
    if (user) {
      role = 'company'
      isPasswordMatched = await Company.isPasswordMatched(
        password,
        user.password,
      )
    }
  }

  // If not found, try Admin collection
  if (!user) {
    user = await Admin.isAdminExistsByEmail(email)
    if (user) {
      role = user.role // Will be 'super_admin', 'admin', or 'moderator'
      isPasswordMatched = await Admin.isPasswordMatched(password, user.password)
    }
  }

  // If user not found in any collection
  if (!user) {
    throw new Error('Invalid email or password')
  }

  // If password doesn't match
  if (!isPasswordMatched) {
    throw new Error('Invalid email or password')
  }

  // Generate JWT token
  const jwtPayload = {
    userId: user._id.toString(),
    role: role,
    email: user.email,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    user,
    accessToken,
    role,
  }
}

export const AuthServices = {
  registerCandidate,
  registerCompany,
  login,
}
