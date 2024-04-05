import { ValidationError } from 'joi'
import { NextFunction, Request, Response } from 'express'
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from '../types/shared.interface'
import { IQueryResponse } from '../types/query.interface'
import { querySchema } from '../schemas/query.schema'

export const queryMiddleware = async (
  req: Request,
  res: Response<IQueryResponse>,
  next: NextFunction
) => {
  try {
    await querySchema.validateAsync(req.body, { abortEarly: false })
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
