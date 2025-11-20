import { ReviewModel, TReview } from './review.model'

const createReviewIntoDB = async (data: TReview) => {
  const result = await ReviewModel.create(data)
  return result
}

const getAllReviewsFromDB = async () => {
  const result = await ReviewModel.find()
    .populate('companyId')
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const getReviewByIdFromDB = async (id: string) => {
  const result = await ReviewModel.findById(id)
    .populate('companyId')
    .populate('candidateId')
  if (!result) {
    throw new Error('Review not found!')
  }
  return result
}

const getReviewsByCompanyFromDB = async (companyId: string) => {
  const result = await ReviewModel.find({ companyId })
    .populate('companyId')
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const getReviewsByCandidateFromDB = async (candidateId: string) => {
  const result = await ReviewModel.find({ candidateId })
    .populate('companyId')
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const updateReviewIntoDB = async (id: string, payload: Partial<TReview>) => {
  const result = await ReviewModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  if (!result) {
    throw new Error('Review not found!')
  }
  return result
}

const deleteReviewFromDB = async (id: string) => {
  const result = await ReviewModel.findByIdAndDelete(id)
  if (!result) {
    throw new Error('Review not found!')
  }
  return result
}

export const reviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
  getReviewByIdFromDB,
  getReviewsByCompanyFromDB,
  getReviewsByCandidateFromDB,
  updateReviewIntoDB,
  deleteReviewFromDB,
}
