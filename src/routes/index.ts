import { Router } from 'express'
import { AppRouterType } from './routes.interface'
import { ContentRoutes } from './content'

class AppRoute implements AppRouterType.IAppRoute {
  private route = Router()

  constructor() {
    this.healthCheck()
    this.contentRoutes()
  }

  private contentRoutes() {
    this.route.use(AppRouterType.ROUTES.BASE, ContentRoutes.getRoutes())
  }

  private healthCheck() {
    this.route.get(AppRouterType.ROUTES.DEFAULT, (_req, res) => {
      res.send(AppRouterType.SERVER_STATUS.UP)
    })
  }

  public getRoutes() {
    return this.route
  }
}

export const Route = new AppRoute()
