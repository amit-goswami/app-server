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
}

export interface IUserDataDocument extends IUserData, Document {}

export interface IAuthResponse {
  message: AUTH_MESSAGE | ERROR_MESSAGE
  user?: IUserDataDocument | IUserDataDocument[]
  errors?: ValidationError
  status?: HTTP_STATUS_CODE
}
