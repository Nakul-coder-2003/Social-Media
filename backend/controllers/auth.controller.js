
import sendOtpMail from "../config/Mail.js";
import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const singUp = async (req, res) => {
  try {
    const { name, email, password, userName } = req.body;

    if (!name || !email || !password || !userName) {
      return res.status(400).json({ message: "please fill all fields!" });
    }

    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res.status(400).json({ message: "User already exist!" });
    }

    const findByUsername = await User.findOne({ userName });
    if (findByUsername) {
      return res.status(400).json({ message: "User already exist!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be 6 characters!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      userName,
      email,
      password: hashPassword,
    });

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({ message: "user create successfully!" });
  } catch (error) {
    return res.status(500).json({ message: `signup error ${error}` });
  }
};

export const signIn = async (req, res) => {
  try {
    const { password, userName } = req.body;

    if (!password || !userName) {
      return res.status(400).json({ message: "please fill all fields!" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    });

    console.log(user);
    return res.status(200).json({ message: "user signIn successfully!" });
  } catch (error) {
    return res.status(500).json({ message: `signIn error ${error}` });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "user signOut successfully!" });
  } catch (error) {
    return res.status(500).json({ message: `signOut error ${error}` });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const otp = Math.floor(Math.random() * 9000 + 1000).toString();

    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVarify = false;

    await user.save();
    await sendOtpMail(email, otp);

    return res.status(200).json({ message: "email successfully send!" });
  } catch (error) {
    return res.status(500).json({ message: `email send error ${error}` });
  }
};

export const varifyOtp = async(req,res)=>{
    try {
        const {email,otp} = req.body;
        const user = await User.findOne({ email });

        if(!user || user.resetOtp!== otp || user.otpExpires< Date.now()) {
            return res.status(400).json({message:"invalid/expred otp"})
        }

        user.isOtpVarify=true
        user.resetOtp=undefined
        user.otpExpires=undefined
        await user.save()
        return res.status(200).json({ message: "otp successfully varified!" });
    } catch (error) {
        return res.status(500).json({ message: `varify otp error ${error}` });
    }
}

export const resetPassword = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({ email });

        if(!user || !user.isOtpVarify){
            return res.status(400).json({message:"otp varification required"})
        }

        const hashPassword = await bcrypt.hash(password,10)
        user.password = hashPassword
        user.isOtpVarify=false
        await user.save();

        return res.status(200).json({message:"password reset successfully"})
    } catch (error) {
         return res.status(500).json({ message: `reset pass error ${error}` });
    }
}
