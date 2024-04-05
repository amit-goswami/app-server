import { Request, Response } from 'express'
import {
  ERROR_MESSAGE,
  HTTP_STATUS_CODE,
  USER_ROLES
} from '../types/shared.interface'
import { AUTH_MESSAGE, IAuthResponse } from '../types/auth.interface'
import { authService } from '../services/auth.service'
import { sharedService } from '../services/shared.service'
import { guideService } from '../services/guide.service'
import { driverService } from '../services/driver.service'

const zero = 0

export const authController = async (
  req: Request,
  res: Response<IAuthResponse>
) => {
  try {
    const { uid, email, role } = req.body

    if (role === USER_ROLES.GUIDE) {
      const guides = await sharedService.findGuideByUID(uid)
      if (guides.length === zero) {
        const createdGuide = await guideService.createGuide({
          email,
          uid
        })
        return res.status(HTTP_STATUS_CODE.CREATED).json(createdGuide)
      }
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: AUTH_MESSAGE.USER_FOUND,
        user: guides[zero],
        status: HTTP_STATUS_CODE.CREATED
      })
    }

    if (role === USER_ROLES.DRIVER) {
      const drivers = await sharedService.findDriverByUID(uid)
      if (drivers.length === zero) {
        const createdDriver = await driverService.createDriver({
          email,
          uid
        })
        return res.status(HTTP_STATUS_CODE.CREATED).json(createdDriver)
      }
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: AUTH_MESSAGE.USER_FOUND,
        user: drivers[zero],
        status: HTTP_STATUS_CODE.CREATED
      })
    }

    if (role === USER_ROLES.USER) {
      const users = await sharedService.findUserByUID(uid)
      if (users.length === zero) {
        const createdUser = await authService.createUser({
          email,
          uid
        })
        return res.status(HTTP_STATUS_CODE.CREATED).json(createdUser)
      }
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: AUTH_MESSAGE.USER_FOUND,
        user: users[zero],
        status: HTTP_STATUS_CODE.CREATED
      })
    }

    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      message: ERROR_MESSAGE.USER_NOT_FOUND,
      status: HTTP_STATUS_CODE.OK
    })
  } catch (error) {
    res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }
}
