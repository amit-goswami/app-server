import { Request, Response } from 'express'
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from '../types/shared.interface'
import { sharedService } from '../services/shared.service'
import { IUserResponse, USER_MESSAGE } from '../types/user.interface'
import { userService } from '../services/user.service'

const zero = 0

export const sendOTPController = async (
  req: Request,
  res: Response<IUserResponse>
) => {
  try {
    const { uid, mobile } = req.body

    const users = await sharedService.findUserByUID(uid)

    if (users.length === zero) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: ERROR_MESSAGE.USER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND
      })
    }

    const result = userService.sendOTPService(mobile)

    res.status(HTTP_STATUS_CODE.OK).json({
      message: USER_MESSAGE.SENTOTP,
      status: HTTP_STATUS_CODE.OK,
      twilioStatus: result,
      user: users[zero]
    })
  } catch (error) {
    res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }
}

export const verifyOTPController = async (
  req: Request,
  res: Response<IUserResponse>
) => {
  try {
    const { mobile, otp } = req.body

    const result = userService.verifyOTPService(mobile, otp)

    res.status(HTTP_STATUS_CODE.OK).json({
      message: USER_MESSAGE.VERIFYOTP,
      status: HTTP_STATUS_CODE.OK,
      twilioStatus: result
    })
  } catch (error) {
    res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }
}
