import { TCandidate, Candidate } from './candidate.model'

const createCandidateIntoDb = async (data: TCandidate) => {
  const result = await Candidate.create(data)
  return result
}
const updateCandidateIntoDB = async (
  id: string,
  payload: Partial<TCandidate>,
) => {
  const result = await Candidate.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const updateCandidateAvatarIntoDB = async (
  id: string,
  payload: Partial<TCandidate>,
) => {
  const result = await Candidate.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const getCandidateFromDB = async (email: string) => {
  const result = await Candidate.findOne({ email }).populate(
    'following followers',
    '_id name avatar',
  )
  return result
}
const getCandidateByIdFromDB = async (id: string) => {
  const result = await Candidate.findById(id)
  if (!result) {
    throw new Error('Candidate not found!')
  }
  return result
}

export const candidateServices = {
  createCandidateIntoDb,
  getCandidateFromDB,
  getCandidateByIdFromDB,
  updateCandidateIntoDB,
  updateCandidateAvatarIntoDB,
}
