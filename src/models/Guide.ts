import mongoose from 'mongoose'
import { USER_ROLES } from '../types/shared.interface'

const { Schema } = mongoose

const GuideSchema = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNumber: {
    type: String,
    unique: true
  },
  isMobileVerified: {
    type: Boolean,
    default: false
  },
  lastOtpSentAt: {
    type: Date
  },
  role: {
    type: String,
    default: USER_ROLES.GUIDE
  }
})

const Guide = mongoose.model('guide', GuideSchema)

export default Guide
