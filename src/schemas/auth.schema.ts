import Joi from 'joi'

export const authSchema = Joi.object({
  uid: Joi.string().required(),
  email: Joi.string().email().required()
})
