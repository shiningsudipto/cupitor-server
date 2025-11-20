import { SavedJobModel, TSavedJob } from './savedJob.model'

const createSavedJobIntoDB = async (data: TSavedJob) => {
  const result = await SavedJobModel.create(data)
  return result
}

const getAllSavedJobsFromDB = async () => {
  const result = await SavedJobModel.find()
    .populate('jobId')
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const getSavedJobByIdFromDB = async (id: string) => {
  const result = await SavedJobModel.findById(id)
    .populate('jobId')
    .populate('candidateId')
  if (!result) {
    throw new Error('Saved job not found!')
  }
  return result
}

const getSavedJobsByCandidateFromDB = async (candidateId: string) => {
  const result = await SavedJobModel.find({ candidateId })
    .populate('jobId')
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const deleteSavedJobFromDB = async (id: string) => {
  const result = await SavedJobModel.findByIdAndDelete(id)
  if (!result) {
    throw new Error('Saved job not found!')
  }
  return result
}

const deleteSavedJobByJobAndCandidateFromDB = async (
  jobId: string,
  candidateId: string,
) => {
  const result = await SavedJobModel.findOneAndDelete({ jobId, candidateId })
  if (!result) {
    throw new Error('Saved job not found!')
  }
  return result
}

export const savedJobServices = {
  createSavedJobIntoDB,
  getAllSavedJobsFromDB,
  getSavedJobByIdFromDB,
  getSavedJobsByCandidateFromDB,
  deleteSavedJobFromDB,
  deleteSavedJobByJobAndCandidateFromDB,
}
