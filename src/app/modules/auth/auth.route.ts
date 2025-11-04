import express from 'express'
import { AuthControllers } from './auth.controller'
import { userControllers } from '../candidate/candidate.controller'

const router = express.Router()

router.post('/login', AuthControllers.loginUser)

router.post('/registration', userControllers.createUser)

export const AuthRoutes = router
