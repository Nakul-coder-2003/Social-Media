import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpMail = async(email,otp)=>{
 await transporter.sendMail({
    from:process.env.EMAIL_USER,
    to:email,
    subject:"Reset your password",
    html:`<p>Your OTP for reset password is <b>${otp}</b>.It expires in 5 minutes</p>`
  })
}

export default sendOtpMail