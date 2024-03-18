import dotenv from 'dotenv'
dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioServiceSID = process.env.TWILIO_SERVICE_SID

const client = require('twilio')(accountSid, authToken, {
  lazyLoading: true
})

const sendOTPService = async (phoneNumber: string) => {
  const result = await client.verify.v2
    .services(twilioServiceSID as string)
    .verifications.create({ to: `+91${phoneNumber}`, channel: 'sms' })
  return result
}

const verifyOTPService = async (phoneNumber: string, otp: string) => {
  const result = await client.verify.v2
    .services(twilioServiceSID as string)
    .verificationChecks.create({ to: `+91${phoneNumber}`, code: otp })
  return result
}

export const userService = {
  sendOTPService,
  verifyOTPService
}
