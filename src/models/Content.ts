import mongoose from 'mongoose'

const { Schema } = mongoose

const ContentSchema = new Schema({
  contentId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  addCount: {
    type: Number,
    default: 0,
    required: true
  },
  updateCount: {
    type: Number,
    default: 0,
    required: true
  }
})

const Content = mongoose.model('content', ContentSchema)

export default Content
