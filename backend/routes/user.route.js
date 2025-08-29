import express, { Router } from "express"
import isAuth from "../middleware/isAuth.js";
import { editProfile, follow, followingList, getCurrentUser, getProfile, search, suggestedUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.js";

const userRouter = express(Router());

userRouter.get("/current", isAuth, getCurrentUser)
userRouter.get("/suggested", isAuth, suggestedUser)
userRouter.get("/getProfile/:userName", isAuth, getProfile)
userRouter.get("/follow/:targetUserId", isAuth, follow)
userRouter.get("/followingList", isAuth, followingList)
userRouter.get("/search", isAuth, search)
userRouter.post("/editProfile",isAuth,upload.single("profileImg"),editProfile)


export default userRouter