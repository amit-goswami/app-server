import rateLimit from 'express-rate-limit'
import { ERROR_MESSAGE } from '../types/shared.interface'

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 100,
  message: ERROR_MESSAGE.RATE_LIMIT
})
