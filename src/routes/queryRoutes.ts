import { Router } from 'express'
import { QUERY_ROUTE } from '../types/query.interface'
import {
  queriesGetController,
  queryCreateController
} from '../controllers/queryControllers'
import { queryMiddleware } from '../middlewares/queryMiddleware'

const router = Router()

router.post(QUERY_ROUTE.QUERY, queryMiddleware, queryCreateController)
router.get(QUERY_ROUTE.QUERY, queriesGetController)

export default router
