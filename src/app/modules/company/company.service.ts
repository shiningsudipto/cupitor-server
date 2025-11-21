import { Company, CompanyType, TCompany } from './company.model'

import { generateSlug } from '../../utils/slugGenerator'

const createCompanyIntoDb = async (data: TCompany) => {
  const companyType = await CompanyType.findById(data.companyType)
  if (!companyType) {
    throw new Error('Company Type not found')
  }

  let slug = generateSlug(`${data.name} ${companyType.label}`)
  let existingCompany = await Company.findOne({ slug })
  let counter = 1

  while (existingCompany) {
    slug = generateSlug(`${data.name} ${companyType.label} ${counter}`)
    existingCompany = await Company.findOne({ slug })
    counter++
  }

  data.slug = slug
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

const getCompanyBySlugFromDB = async (slug: string) => {
  const result = await Company.findOne({ slug }).populate('companyType')
  if (!result) {
    throw new Error('Company not found!')
  }
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
  getCompanyBySlugFromDB,
  getCompanyByIdFromDB,
  updateCompanyIntoDB,
  updateCompanyLogoIntoDB,
  deleteCompanyFromDB,
  createCompanyTypeIntoDB,
  getAllCompanyTypesFromDB,
}
