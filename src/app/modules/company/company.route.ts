import express from 'express'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middlewares/bodyParser'
import { companyControllers } from './company.controller'

const router = express.Router()

router.post('/company', companyControllers.create)
router.get('/company', companyControllers.getAll)
router.get('/company/:username', companyControllers.getByUsername)
router.get('/company/:id', companyControllers.getById)
router.delete('/company/:id', companyControllers.deleteCompany)
router.put(
  '/company-update/:id',
  multerUpload.fields([{ name: 'logo' }]),
  parseBody,
  companyControllers.update,
)

export const CompanyRoutes = router
