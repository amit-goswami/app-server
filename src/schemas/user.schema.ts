import Joi from 'joi'

export const userSentOtpSchema = Joi.object({
  uid: Joi.string().required(),
  mobile: Joi.string().pattern(new RegExp('^[0-9]{10}$')),
  role: Joi.string().required()
})

export const userVerifyOtpSchema = Joi.object({
  uid: Joi.string().required(),
  mobile: Joi.string().pattern(new RegExp('^[0-9]{10}$')),
  otp: Joi.string().required(),
  role: Joi.string().required()
})
