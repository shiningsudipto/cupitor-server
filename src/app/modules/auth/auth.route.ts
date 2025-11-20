import express from 'express'
import { AuthControllers } from './auth.controller'

const router = express.Router()

// Registration routes
router.post('/register/candidate', AuthControllers.registerCandidate)
router.post('/register/company', AuthControllers.registerCompany)

// Login route (for all user types)
router.post('/login', AuthControllers.login)

export const AuthRoutes = router
