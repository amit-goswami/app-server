import { Request, Response } from 'express'
import {
  ADMIN,
  ERROR_MESSAGE,
  HTTP_STATUS_CODE
} from '../types/shared.interface'
import { IQueryResponse } from '../types/query.interface'
import { queryService } from '../services/query.service'

export const queryCreateController = async (
  req: Request,
  res: Response<IQueryResponse>
) => {
  try {
    const { name, email, mobileNumber } = req.body

    const createdQuery = await queryService.createQuery({
      name,
      email,
      mobileNumber
    })

    return res.status(HTTP_STATUS_CODE.CREATED).json(createdQuery)
  } catch (error) {
    res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }
}

export const queriesGetController = async (
  req: Request,
  res: Response<IQueryResponse>
) => {
  try {
    const { email } = req.query

    if (email !== ADMIN.EMAIL) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: ERROR_MESSAGE.NOT_AUTHORIZED,
        status: HTTP_STATUS_CODE.OK
      })
    }

    const queries = await queryService.getQueries()

    return res.status(HTTP_STATUS_CODE.OK).json(queries)
  } catch (error) {
    res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }
}
