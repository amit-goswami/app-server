import { ValidationError } from 'joi'
import { Document } from 'mongoose'
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from './shared.interface'

export enum QUERY_MESSAGE {
  QUERY_CREATED = 'Query created successfully',
  QUERIES_FETCHED = 'Queries fetched successfully'
}

export enum QUERY_STATUS {
  PENDING = 'pending',
  RESOLVED = 'resolved'
}

export enum QUERY_ROUTE {
  QUERY = '/query'
}

export interface IQueryData {
  uid?: string
  name: string
  email: string
  mobileNumber: string
  status?: QUERY_STATUS
  createdAt?: Date
}

export interface IQueryDataDocument extends IQueryData, Document {}

export interface IQueryResponse {
  message: QUERY_MESSAGE | ERROR_MESSAGE
  query?: IQueryDataDocument | IQueryDataDocument[] | any
  errors?: ValidationError
  status?: HTTP_STATUS_CODE
}
