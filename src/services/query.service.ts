import Query from '../models/Query'
import {
  IQueryData,
  IQueryResponse,
  QUERY_MESSAGE,
  QUERY_STATUS
} from '../types/query.interface'
import { HTTP_STATUS_CODE } from '../types/shared.interface'

const createQuery = async (queryData: IQueryData): Promise<IQueryResponse> => {
  const newQuery = new Query(queryData)
  await newQuery.validate()
  await newQuery.save()
  return {
    message: QUERY_MESSAGE.QUERY_CREATED,
    query: newQuery,
    status: HTTP_STATUS_CODE.CREATED
  }
}

const getQueries = async (): Promise<IQueryResponse> => {
  const queries = await Query.find({ status: QUERY_STATUS.PENDING })
  return {
    message: QUERY_MESSAGE.QUERIES_FETCHED,
    query: queries,
    status: HTTP_STATUS_CODE.OK
  }
}

export const queryService = {
  createQuery,
  getQueries
}
