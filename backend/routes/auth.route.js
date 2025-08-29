import express, { Router } from "express";
import { resetPassword, sendOtp, signIn, signOut, singUp, varifyOtp } from "../controllers/auth.controller.js";

const authRouter = express(Router())

authRouter.post("/signUp", singUp)
authRouter.post("/signIn",signIn)
authRouter.get("/signOut",signOut)
authRouter.post("/sendotp",sendOtp);
authRouter.post("/varifyOtp",varifyOtp)
authRouter.post("/resetPass",resetPassword)

export default authRouter;