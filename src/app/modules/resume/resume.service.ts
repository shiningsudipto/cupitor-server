import { ResumeModel, TResume } from './resume.model'

const createResumeIntoDB = async (data: TResume) => {
  const result = await ResumeModel.create(data)
  return result
}

const getAllResumesFromDB = async () => {
  const result = await ResumeModel.find()
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const getResumeByIdFromDB = async (id: string) => {
  const result = await ResumeModel.findById(id).populate('candidateId')
  if (!result) {
    throw new Error('Resume not found!')
  }
  return result
}

const getResumesByCandidateFromDB = async (candidateId: string) => {
  const result = await ResumeModel.find({ candidateId })
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const updateResumeIntoDB = async (id: string, payload: Partial<TResume>) => {
  const result = await ResumeModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  if (!result) {
    throw new Error('Resume not found!')
  }
  return result
}

const deleteResumeFromDB = async (id: string) => {
  const result = await ResumeModel.findByIdAndDelete(id)
  if (!result) {
    throw new Error('Resume not found!')
  }
  return result
}

export const resumeServices = {
  createResumeIntoDB,
  getAllResumesFromDB,
  getResumeByIdFromDB,
  getResumesByCandidateFromDB,
  updateResumeIntoDB,
  deleteResumeFromDB,
}
