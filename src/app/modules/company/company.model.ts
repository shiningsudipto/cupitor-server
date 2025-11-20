import mongoose, { Model, ObjectId, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../../config'

export interface TCompanyType {
  _id: string
  label: string
}

export interface TCompany {
  _id: string
  name: string
  username: string
  email: string
  logo?: string
  companyType: ObjectId
  location?: string
  employee_len?: string
  password: string
}

export interface CompanyModel extends Model<TCompany> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}

const companyTypeSchema = new Schema<TCompanyType>({
  label: { type: String, required: true },
})

const companySchema = new Schema<TCompany, CompanyModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    logo: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyType: {
      type: Schema.Types.ObjectId,
      ref: 'CompanyType',
      required: true,
    },
    location: { type: String },
    employee_len: { type: String },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
companySchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const company = this
  if (!company.isModified('password')) {
    return next()
  }
  company.password = await bcrypt.hash(
    company.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

// Hide password in JSON responses
companySchema.methods.toJSON = function () {
  const companyObject = this.toObject()
  delete companyObject.password
  return companyObject
}

// Static method to check password
companySchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const Company = mongoose.model<TCompany, CompanyModel>(
  'Company',
  companySchema,
)
export const CompanyType = mongoose.model('CompanyType', companyTypeSchema)
