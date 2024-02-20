import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { config } from 'dotenv'
import { App } from './server.interface'
import { Connect } from '../connect-db'
import { Logger } from '../logger'
import { Route } from '../routes'

class Server implements App.IAppServer {
  public app: Application
  public port: string

  constructor() {
    config()
    this.app = express()
    this.app.use(morgan('combined'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(helmet())
    this.app.use(cors())
    this.port = process.env.PORT || App.PORT.DEFAULT
  }

  private routesInit() {
    this.app.use(Route.getRoutes())
  }

  private listen() {
    this.app.listen(this.port, () => {
      Logger.log(`Server started at http://localhost:${this.port}`)
    })
  }

  public start() {
    this.routesInit()
    this.listen()
    Connect.connect()
  }
}

export const AppServer = new Server()
