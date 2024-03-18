import { ValidationError } from 'joi'
import { NextFunction, Request, Response } from 'express'
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from '../types/shared.interface'
import { userSentOtpSchema } from '../schemas/user.schema'
import { IUserResponse } from '../types/user.interface'

export const sentOtpMiddleware = async (
  req: Request,
  res: Response<IUserResponse>,
  next: NextFunction
) => {
  try {
    await userSentOtpSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: Error | any) {
    const validationErrors = error.details.map(
      (detail: ValidationError) => detail.message
    )
    return res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.VALIDATION_ERROR,
      errors: validationErrors,
      status: HTTP_STATUS_CODE.BAD_REQUEST
    })
  }
}

export const verifyOtpMiddleware = async (
  req: Request,
  res: Response<IUserResponse>,
  next: NextFunction
) => {
  try {
    await userSentOtpSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: Error | any) {
    const validationErrors = error.details.map(
      (detail: ValidationError) => detail.message
    )
    return res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.VALIDATION_ERROR,
      errors: validationErrors,
      status: HTTP_STATUS_CODE.BAD_REQUEST
    })
  }
}
