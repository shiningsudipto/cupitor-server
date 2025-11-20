import { TAdmin, Admin } from './admin.model'

const createAdmin = async (data: Partial<TAdmin>) => {
  const result = await Admin.create(data)
  return result
}

const getAllAdmins = async () => {
  const result = await Admin.find()
  return result
}

const getAdminById = async (id: string) => {
  const result = await Admin.findById(id)
  if (!result) {
    throw new Error('Admin not found!')
  }
  return result
}

const updateAdmin = async (id: string, payload: Partial<TAdmin>) => {
  const result = await Admin.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  if (!result) {
    throw new Error('Admin not found!')
  }
  return result
}

const deleteAdmin = async (id: string) => {
  const result = await Admin.findByIdAndDelete(id)
  if (!result) {
    throw new Error('Admin not found!')
  }
  return result
}

export const adminServices = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
}
