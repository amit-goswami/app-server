import { Router } from 'express'
import { ContentController } from '../../controllers/content'
import { AppContentType } from '../../types/content.interface'

export class AppContentRoutes implements AppContentType.IContentRoute {
  private route = Router()
  private controller = ContentController

  constructor() {
    this.contentGet()
    this.contentPut()
  }

  private contentGet() {
    this.route.get(
      AppContentType.ROUTES.CONTENT,
      this.controller.getAllContents
    )
  }

  private contentPut() {
    this.route.put(
      AppContentType.ROUTES.ADD_CONTENT,
      this.controller.updateContent
    )
  }

  public getRoutes() {
    return this.route
  }
}

export const ContentRoutes = new AppContentRoutes()
