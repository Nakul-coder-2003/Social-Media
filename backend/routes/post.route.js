import express from "express"
import isAuth from "../middleware/isAuth.js"
import { comment, getAllPosts, like, saved, uploadPost } from "../controllers/post.controller.js"
import { upload } from "../middleware/multer.js"

const postRoute = express.Router()

postRoute.post("/upload",isAuth,upload.single("media"),uploadPost)
postRoute.get("/getAllpost",isAuth,getAllPosts)
postRoute.get("/like/:postId",isAuth,like)
postRoute.post("/comment/:postId",isAuth,comment)
postRoute.get("/saved/:postId",isAuth,saved)

export default postRoute