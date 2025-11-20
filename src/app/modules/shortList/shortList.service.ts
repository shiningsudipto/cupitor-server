import { ShortListModel, TShortList } from './shortList.model'

const createShortListIntoDB = async (data: TShortList) => {
  const result = await ShortListModel.create(data)
  return result
}

const getAllShortListsFromDB = async () => {
  const result = await ShortListModel.find()
    .populate('jobId')
    .populate('companyId')
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const getShortListByIdFromDB = async (id: string) => {
  const result = await ShortListModel.findById(id)
    .populate('jobId')
    .populate('companyId')
    .populate('candidateId')
  if (!result) {
    throw new Error('ShortList not found!')
  }
  return result
}

const getShortListsByJobFromDB = async (jobId: string) => {
  const result = await ShortListModel.find({ jobId })
    .populate('jobId')
    .populate('companyId')
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const getShortListsByCompanyFromDB = async (companyId: string) => {
  const result = await ShortListModel.find({ companyId })
    .populate('jobId')
    .populate('companyId')
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const getShortListsByCandidateFromDB = async (candidateId: string) => {
  const result = await ShortListModel.find({ candidateId })
    .populate('jobId')
    .populate('companyId')
    .populate('candidateId')
    .sort({ createdAt: -1 })
  return result
}

const deleteShortListFromDB = async (id: string) => {
  const result = await ShortListModel.findByIdAndDelete(id)
  if (!result) {
    throw new Error('ShortList not found!')
  }
  return result
}

export const shortListServices = {
  createShortListIntoDB,
  getAllShortListsFromDB,
  getShortListByIdFromDB,
  getShortListsByJobFromDB,
  getShortListsByCompanyFromDB,
  getShortListsByCandidateFromDB,
  deleteShortListFromDB,
}
