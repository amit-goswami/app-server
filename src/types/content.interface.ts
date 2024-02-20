import { ValidationError } from 'joi'
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from './shared.interface'
import { Document } from 'mongoose'
import { Request, Response } from 'express'

export namespace AppContentType {
  export interface IContentRoute {
    getRoutes(): void
  }

  export enum ROUTES {
    CONTENT = '/content',
    ADD_CONTENT = '/content/:id'
  }

  export interface IContentController {
    getAllContents(req: Request, res: Response): Promise<void>
    updateContent(req: Request, res: Response): Promise<void>
  }

  export enum CONTENT_MESSAGE {
    CONTENT_CREATED = 'Content created successfully'
  }

  export interface IContentData {
    userId: string
    content: string
    addCount: number
    updatedCount: number
  }

  export interface IContentDataDocument extends Document, IContentData {}

  export interface IAuthResponse {
    message: CONTENT_MESSAGE | ERROR_MESSAGE
    content?: IContentDataDocument
    errors?: ValidationError
    status?: HTTP_STATUS_CODE
  }
}
