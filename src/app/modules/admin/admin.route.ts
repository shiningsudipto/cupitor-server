import express from 'express'
import { adminControllers } from './admin.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

// Only super_admin can create new admins
router.post('/', auth('super_admin'), adminControllers.createAdmin)

// Super admin and admin can view all admins
router.get('/', auth('super_admin', 'admin'), adminControllers.getAllAdmins)

// Super admin and admin can view admin by ID
router.get('/:id', auth('super_admin', 'admin'), adminControllers.getAdminById)

// Only super_admin can update admins
router.put('/:id', auth('super_admin'), adminControllers.updateAdmin)

// Only super_admin can delete admins
router.delete('/:id', auth('super_admin'), adminControllers.deleteAdmin)

export const AdminRoutes = router
