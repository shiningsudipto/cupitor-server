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
router.put(
  '/update/:id',
  multerUpload.fields([{ name: 'logo' }]),
  parseBody,
  companyControllers.update,
)

export const CompanyRoutes = router
