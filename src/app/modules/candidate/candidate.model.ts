import { Model, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../../config'

export type TCandidate = {
  _id: string
  name: string
  email: string
  avatar?: string
  password: string
  phone: string
  role: 'candidate'
  city: string
  address?: string
  skills?: string[]
  education: string
  yearsOfExperience?: string
  github?: string
  linkedin: string
}

export const USER_ROLE = {
  user: 'user',
  admin: 'admin',
  candidate: 'candidate',
  company: 'company',
}

export interface UserModel extends Model<TCandidate> {
  //instance methods for checking if the user exist
  isUserExistsByPhone(phone: string): Promise<TCandidate>
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}

const candidateSchema = new Schema<TCandidate, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    phone: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['candidate'],
      default: 'candidate',
    },
    address: { type: String, required: false },
    city: { type: String, required: false },
    skills: { type: Array, required: false },
    education: { type: String, required: false },
    yearsOfExperience: { type: String, required: false },
    github: { type: String, required: false },
    linkedin: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

candidateSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this // doc
  // hashing password and save into DB
  if (!user.isModified('password')) {
    return next()
  }
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

candidateSchema.methods.toJSON = function () {
  const userObject = this.toObject()

  delete userObject.password

  return userObject
}

// Static method to find user by phone
candidateSchema.statics.isUserExistsByPhone = async function (phone: string) {
  return await this.findOne({ phone })
}

candidateSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const Candidate = model<TCandidate, UserModel>('User', candidateSchema)
