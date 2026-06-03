const transporter = require("../config/mailer");

const sendOtpMail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAILID,

      to: email,

      subject: "Your OTP Code",

      html: `

            <h2>OTP Verification</h2>

            <p>Your OTP is:</p>

            <h1>${otp}</h1>

            <p>
               This OTP expires in 5 minutes.
            </p>

         `,
    });

    console.log("OTP Email Sent");
  } catch (err) {
    console.log("Mail error", err.message);
  }
};

module.exports = sendOtpMail;
