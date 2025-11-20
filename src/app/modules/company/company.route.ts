import express from 'express'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middlewares/bodyParser'
import { companyControllers } from './company.controller'

const router = express.Router()

router.post('/', companyControllers.create)
router.get('/', companyControllers.getAll)
router.get('/:username', companyControllers.getByUsername)
router.get('/:id', companyControllers.getById)
router.delete('/:id', companyControllers.deleteCompany)
router.post(
  '/register',
  multerUpload.fields([{ name: 'logo' }]),
  parseBody,
  companyControllers.create,
)

router.post('/company-type', companyControllers.createCompanyType)
router.get('/company-type', companyControllers.getAllCompanyTypes)

export const CompanyRoutes = router
