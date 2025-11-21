import { TCandidate, Candidate } from './candidate.model'

import { generateSlug } from '../../utils/slugGenerator'

const createCandidateIntoDb = async (data: TCandidate) => {
  const username = data.email.split('@')[0]
  let slug = generateSlug(`${data.name} ${username}`)
  let existingCandidate = await Candidate.findOne({ slug })
  let counter = 1

  while (existingCandidate) {
    slug = generateSlug(`${data.name} ${username} ${counter}`)
    existingCandidate = await Candidate.findOne({ slug })
    counter++
  }

  data.slug = slug
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
  if (!result) {
    throw new Error('Candidate not found!')
  }
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
  if (!result) {
    throw new Error('Candidate not found!')
  }
  return result
}

const getCandidateFromDB = async (email: string) => {
  const result = await Candidate.findOne({ email })
  if (!result) {
    throw new Error('Candidate not found!')
  }
  return result
}

const getCandidateBySlugFromDB = async (slug: string) => {
  const result = await Candidate.findOne({ slug })
  if (!result) {
    throw new Error('Candidate not found!')
  }
  return result
}

const getCandidateByIdFromDB = async (id: string) => {
  const result = await Candidate.findById(id)
  if (!result) {
    throw new Error('Candidate not found!')
  }
  return result
}

const deleteCandidateFromDB = async (id: string) => {
  const result = await Candidate.findByIdAndDelete(id)
  if (!result) {
    throw new Error('Candidate not found!')
  }
  return result
}

export const candidateServices = {
  createCandidateIntoDb,
  getCandidateFromDB,
  getCandidateBySlugFromDB,
  getCandidateByIdFromDB,
  updateCandidateIntoDB,
  updateCandidateAvatarIntoDB,
  deleteCandidateFromDB,
}
