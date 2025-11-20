import { Company, CompanyType, TCompany } from './company.model'

const createCompanyIntoDb = async (data: TCompany) => {
  const result = await Company.create(data)
  return result
}
const updateCompanyIntoDB = async (id: string, payload: Partial<TCompany>) => {
  const result = await Company.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const updateCompanyLogoIntoDB = async (
  id: string,
  payload: Partial<TCompany>,
) => {
  const result = await Company.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteCompanyFromDB = async (id: string) => {
  const result = await Company.findByIdAndDelete({ id })
  return result
}
const getCompanyFromDB = async (username: string) => {
  const result = await Company.findOne({ username })
  return result
}
const getCompanyByIdFromDB = async (id: string) => {
  const result = await Company.findById(id)
  if (!result) {
    throw new Error('Company not found!')
  }
  return result
}

const createCompanyTypeIntoDB = async (data: { label: string }) => {
  const result = await CompanyType.create(data)
  return result
}

const getAllCompanyTypesFromDB = async () => {
  const result = await CompanyType.find()
  return result
}

export const companyServices = {
  createCompanyIntoDb,
  getCompanyFromDB,
  getCompanyByIdFromDB,
  updateCompanyIntoDB,
  updateCompanyLogoIntoDB,
  deleteCompanyFromDB,
  createCompanyTypeIntoDB,
  getAllCompanyTypesFromDB,
}
