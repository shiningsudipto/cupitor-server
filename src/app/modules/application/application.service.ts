import { ApplicationModel, TApplication } from './application.model'

const createApplicationIntoDB = async (data: TApplication) => {
  const result = await ApplicationModel.create(data)
  return result
}

const getAllApplicationsFromDB = async () => {
  const result = await ApplicationModel.find()
    .populate('jobId')
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const getApplicationByIdFromDB = async (id: string) => {
  const result = await ApplicationModel.findById(id)
    .populate('jobId')
    .populate('candidateId')
  if (!result) {
    throw new Error('Application not found!')
  }
  return result
}

const getApplicationsByCandidateFromDB = async (candidateId: string) => {
  const result = await ApplicationModel.find({ candidateId })
    .populate('jobId')
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const getApplicationsByJobFromDB = async (jobId: string) => {
  const result = await ApplicationModel.find({ jobId })
    .populate('jobId')
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const updateApplicationIntoDB = async (
  id: string,
  payload: Partial<TApplication>,
) => {
  const result = await ApplicationModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  if (!result) {
    throw new Error('Application not found!')
  }
  return result
}

const deleteApplicationFromDB = async (id: string) => {
  const result = await ApplicationModel.findByIdAndDelete(id)
  if (!result) {
    throw new Error('Application not found!')
  }
  return result
}

export const applicationServices = {
  createApplicationIntoDB,
  getAllApplicationsFromDB,
  getApplicationByIdFromDB,
  getApplicationsByCandidateFromDB,
  getApplicationsByJobFromDB,
  updateApplicationIntoDB,
  deleteApplicationFromDB,
}
