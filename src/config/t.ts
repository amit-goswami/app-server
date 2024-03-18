// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = 'AC8514fc426af458211796927dd0e06e74'
const authToken = '74eed144edb5a163537ad8e1606e4122'
const verifySid = 'VA39872952409567f3ee33b09f869caf17'
const client = require('twilio')(accountSid, authToken)

client.verify.v2
  .services(verifySid)
  .verifications.create({ to: '+918368554766', channel: 'sms' })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
    readline.question('Please enter the OTP:', (otpCode) => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: '+918368554766', code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => readline.close())
    })
  })

// 74eed144edb5a163537ad8e1606e4122
