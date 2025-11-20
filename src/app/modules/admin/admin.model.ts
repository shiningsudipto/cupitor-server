import { Model, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../../config'

export type TAdminRole = 'super_admin' | 'admin' | 'moderator'

export type TAdmin = {
  _id: string
  name: string
  email: string
  password: string
  role: TAdminRole
  createdAt?: Date
  updatedAt?: Date
}

export interface AdminModel extends Model<TAdmin> {
  isAdminExistsByEmail(email: string): Promise<TAdmin>
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['super_admin', 'admin', 'moderator'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
adminSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const admin = this
  if (!admin.isModified('password')) {
    return next()
  }
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

// Hide password in JSON responses
adminSchema.methods.toJSON = function () {
  const adminObject = this.toObject()
  delete adminObject.password
  return adminObject
}

// Static method to find admin by email
adminSchema.statics.isAdminExistsByEmail = async function (email: string) {
  return await this.findOne({ email })
}

// Static method to check password
adminSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema)
