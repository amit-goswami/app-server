import { ValidationError } from 'joi'
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from './shared.interface'
import { Document } from 'mongoose'

export enum USER_MESSAGE {
  SENTOTP = 'OTP sent successfully',
  VERIFYOTP = 'OTP verified successfully',
  OTP_NOT_GENERATED = 'OTP not generated'
}

export enum USER_ROUTE {
  SENTOTP = '/user/sentotp',
  VERIFYOTP = '/user/verifyotp'
}

export interface IUserUpdatedData {
  uid: string
  email: string
  mobileNumber: string
  isMobileVerified: boolean
  lastOtpSentAt: Date
  nextOtpWillBeSentIn: Date
  createdAt: Date
}

export interface IUserUpdatedDataDocument extends IUserUpdatedData, Document {}

export interface IUserResponse {
  user?: IUserUpdatedDataDocument | IUserUpdatedDataDocument[] | any
  message: USER_MESSAGE | ERROR_MESSAGE
  errors?: ValidationError
  status?: HTTP_STATUS_CODE
  twilioStatus?: any
}
