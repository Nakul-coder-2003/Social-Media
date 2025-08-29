import express from "express"
import isAuth from "../middleware/isAuth.js"
import { upload } from "../middleware/multer.js"
import { getAllReels, reelComment, reelLike, uploadReel } from "../controllers/reel.controller.js"

const reelRoute = express.Router()

reelRoute.post("/upload",isAuth,upload.single("media"),uploadReel)
reelRoute.get("/getAllreel",isAuth,getAllReels)
reelRoute.get("/like/:reelId",isAuth,reelLike)
reelRoute.post("/comment/:reelId",isAuth,reelComment)

export default reelRoute