import mongoose, { ObjectId, Schema } from 'mongoose'

export interface TCompanyType {
  _id: string
  label: string
}

export interface TCompany {
  _id: string
  name: string
  username: string
  email: string
  logo: string
  companyType: ObjectId
  location: string
  employee_len: string
  password_hash: string
}

const companyTypeSchema = new Schema<TCompanyType>({
  label: { type: String, required: true },
})

const companySchema = new Schema<TCompany>(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    username: { type: String, required: true, unique: true },
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

export const Company = mongoose.model('Company', companySchema)
export const CompanyType = mongoose.model('CompanyType', companyTypeSchema)
