import {
  CandidateExperienceModel,
  TCandidateExperience,
} from './candidateExperience.model'

const createCandidateExperienceIntoDB = async (data: TCandidateExperience) => {
  const result = await CandidateExperienceModel.create(data)
  return result
}

const getAllCandidateExperiencesFromDB = async () => {
  const result = await CandidateExperienceModel.find()
    .populate('candidateId')
    .sort({ startDate: -1 })
  return result
}

const getCandidateExperienceByIdFromDB = async (id: string) => {
  const result =
    await CandidateExperienceModel.findById(id).populate('candidateId')
  if (!result) {
    throw new Error('Candidate experience not found!')
  }
  return result
}

const getCandidateExperiencesByCandidateFromDB = async (
  candidateId: string,
) => {
  const result = await CandidateExperienceModel.find({ candidateId })
    .populate('candidateId')
    .sort({ startDate: -1 })
  return result
}

const updateCandidateExperienceIntoDB = async (
  id: string,
  payload: Partial<TCandidateExperience>,
) => {
  const result = await CandidateExperienceModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  if (!result) {
    throw new Error('Candidate experience not found!')
  }
  return result
}

const deleteCandidateExperienceFromDB = async (id: string) => {
  const result = await CandidateExperienceModel.findByIdAndDelete(id)
  if (!result) {
    throw new Error('Candidate experience not found!')
  }
  return result
}

export const candidateExperienceServices = {
  createCandidateExperienceIntoDB,
  getAllCandidateExperiencesFromDB,
  getCandidateExperienceByIdFromDB,
  getCandidateExperiencesByCandidateFromDB,
  updateCandidateExperienceIntoDB,
  deleteCandidateExperienceFromDB,
}
