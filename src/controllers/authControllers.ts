import { Request, Response } from 'express'
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from '../types/shared.interface'
import { AUTH_MESSAGE, IAuthResponse } from '../types/auth.interface'
import { authService } from '../services/auth.service'
import { sharedService } from '../services/shared.service'

const zero = 0

export const authController = async (
  req: Request,
  res: Response<IAuthResponse>
) => {
  try {
    const { uid, email } = req.body

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
  } catch (error) {
    res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }
}
