import { Model, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../../config'

export type TUser = {
  _id: string
  name: string
  email: string
  avatar?: string
  password: string
  phone: string
  role?: 'candidate'
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

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByPhone(phone: string): Promise<TUser>
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String },
    email: { type: String, required: false },
    password: { type: String },
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
    education: { type: String, required: true },
    yearsOfExperience: { type: String, required: false },
    github: { type: String, required: false },
    linkedin: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
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

userSchema.methods.toJSON = function () {
  const userObject = this.toObject()

  delete userObject.password

  return userObject
}

// Static method to find user by phone
userSchema.statics.isUserExistsByPhone = async function (phone: string) {
  return await this.findOne({ phone })
}

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const User = model<TUser, UserModel>('User', userSchema)
