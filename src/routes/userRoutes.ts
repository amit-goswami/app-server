import { Router } from 'express'
import {
  sentOtpMiddleware,
  verifyOtpMiddleware
} from '../middlewares/userMiddleware'
import { USER_ROUTE } from '../types/user.interface'
import {
  sendOTPController,
  verifyOTPController
} from '../controllers/userControllers'

const router = Router()

router.post(USER_ROUTE.SENTOTP, sentOtpMiddleware, sendOTPController)
router.post(USER_ROUTE.VERIFYOTP, verifyOtpMiddleware, verifyOTPController)

export default router
