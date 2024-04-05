import mongoose from 'mongoose'
import { QUERY_STATUS } from '../types/query.interface'

const { Schema } = mongoose

const QuerySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String
  },
  status: {
    type: String,
    default: QUERY_STATUS.PENDING
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const Query = mongoose.model('query', QuerySchema)

export default Query
