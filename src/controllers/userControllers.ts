import { Request, Response } from 'express'
import {
  ERROR_MESSAGE,
  HTTP_STATUS_CODE,
  VERIFICATION_STATUS
} from '../types/shared.interface'
import { sharedService } from '../services/shared.service'
import { IUserResponse, USER_MESSAGE } from '../types/user.interface'
import { userService } from '../services/user.service'

const zero = 0

export const sendOTPController = async (
  req: Request,
  res: Response<IUserResponse>
) => {
  try {
    const { uid, mobile, role } = req.body

    const users =
      await sharedService.searchInDifferentCollectionsAccordingToRole({
        role,
        uid
      })

    if (users.length === 0) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        message: ERROR_MESSAGE.USER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND
      })
    }

    const duplicateMobileNumbers =
      await sharedService.searchInDifferentCollectionsAccordingToRoleAndMobile({
        role,
        mobile
      })

    if (duplicateMobileNumbers.length !== zero) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: USER_MESSAGE.MOBILE_ALREADY_EXISTS,
        status: HTTP_STATUS_CODE.OK,
        user: duplicateMobileNumbers[zero]
      })
    }

    const user = users[0]

    if (!user.lastOtpSentAt) {
      const result = await userService.sendOTPService(mobile)
      user.lastOtpSentAt = new Date()
      await user.save()

      return res.status(HTTP_STATUS_CODE.OK).json({
        message: USER_MESSAGE.SENTOTP,
        status: HTTP_STATUS_CODE.OK,
        twilioStatus: result,
        user: user
      })
    }

    const currentTimestamp = new Date().getTime()
    const lastSentTimestamp = new Date(user.lastOtpSentAt).getTime()
    const differenceInSeconds = (currentTimestamp - lastSentTimestamp) / 1000

    if (differenceInSeconds < 90) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: USER_MESSAGE.OTP_NOT_GENERATED,
        status: HTTP_STATUS_CODE.OK,
        user: user
      })
    }

    const result = await userService.sendOTPService(mobile)
    user.lastOtpSentAt = new Date()
    await user.save()

    return res.status(HTTP_STATUS_CODE.OK).json({
      message: USER_MESSAGE.SENTOTP,
      status: HTTP_STATUS_CODE.OK,
      twilioStatus: result,
      user: user
    })
  } catch (error) {
    console.error('Error sending OTP:', error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
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
    const { mobile, uid, otp, role } = req.body

    const users =
      await sharedService.searchInDifferentCollectionsAccordingToRole({
        role,
        uid
      })

    if (users.length === zero) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: ERROR_MESSAGE.USER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND
      })
    }

    const result = await userService.verifyOTPService(mobile, otp)

    if (result.status === VERIFICATION_STATUS.APPROVED) {
      users[zero].isMobileVerified = true
      users[zero].mobileNumber = mobile

      await users[zero].save()

      return res.status(HTTP_STATUS_CODE.OK).json({
        message: USER_MESSAGE.VERIFYOTP,
        status: HTTP_STATUS_CODE.OK,
        twilioStatus: result,
        user: users[zero]
      })
    }

    res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.INVALID_OTP,
      status: HTTP_STATUS_CODE.OK,
      twilioStatus: result,
      user: users[zero]
    })
  } catch (error) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }
}
