import { JobModel, JobTypeModel, TJob } from './job.model'

const createJobIntoDB = async (data: TJob) => {
  const result = await JobModel.create(data)
  return result
}

const getAllJobsFromDB = async () => {
  const result = await JobModel.find()
    .populate('companyId')
    .populate('jobType')
    .sort({ createdAt: -1 })
  return result
}

const getJobByIdFromDB = async (id: string) => {
  const result = await JobModel.findById(id)
    .populate('companyId')
    .populate('jobType')
  if (!result) {
    throw new Error('Job not found!')
  }
  return result
}

const getJobsByCompanyFromDB = async (companyId: string) => {
  const result = await JobModel.find({ companyId })
    .populate('companyId')
    .populate('jobType')
    .sort({ createdAt: -1 })
  return result
}

const updateJobIntoDB = async (id: string, payload: Partial<TJob>) => {
  const result = await JobModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  if (!result) {
    throw new Error('Job not found!')
  }
  return result
}

const deleteJobFromDB = async (id: string) => {
  const result = await JobModel.findByIdAndDelete(id)
  if (!result) {
    throw new Error('Job not found!')
  }
  return result
}

const createJobTypeIntoDB = async (data: { label: string }) => {
  const result = await JobTypeModel.create(data)
  return result
}

const getAllJobTypesFromDB = async () => {
  const result = await JobTypeModel.find()
  return result
}

export const jobServices = {
  createJobIntoDB,
  getAllJobsFromDB,
  getJobByIdFromDB,
  getJobsByCompanyFromDB,
  updateJobIntoDB,
  deleteJobFromDB,
  createJobTypeIntoDB,
  getAllJobTypesFromDB,
}
