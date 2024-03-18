import { ValidationError } from 'joi'
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from './shared.interface'
import { Document } from 'mongoose'

export enum AUTH_MESSAGE {
  USER_CREATED = 'User created successfully',
  USER_FOUND = 'User found'
}

export enum AUTH_ROUTE {
  LOGIN = '/login'
}

export interface IUserData {
  uid: string
  email: string
  mobileNumber?: string
  isMobileVerified?: boolean
  createdAt?: Date
  lastOtpSentAt?: Date
}

export interface IUserDataDocument extends IUserData, Document {}

export interface IAuthResponse {
  message: AUTH_MESSAGE | ERROR_MESSAGE
  user?: IUserDataDocument | IUserDataDocument[] | any
  errors?: ValidationError
  status?: HTTP_STATUS_CODE
}
