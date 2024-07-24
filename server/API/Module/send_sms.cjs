const accountSid = "AC7d6926caa8ace8f5820150f5d89fb768";
const authToken = "b51a77e0a6b00760f5ff44a59af76677";
const verifySid = "VA097428b48fdc2b4d8b0ba5eb4f26c7f6";
const client = require("twilio")(accountSid, authToken);

client.verify.v2
  .services(verifySid)
  .verifications.create({ to: "+918849698524", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    }); 
    readline.question("Please enter the OTP:", (otpCode) => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: "+918849698524", code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => readline.close());
    });
  });