import express from "express"
import isAuth from "../middleware/isAuth.js"
import { upload } from "../middleware/multer.js"
import { getAllStory, getStoryByUsername, uploadStory, viewerStory } from "../controllers/story.controller.js";

const storyRoute = express.Router();

storyRoute.post("/upload",isAuth,upload.single("media"),uploadStory);
storyRoute.get("/storyViewers",isAuth,viewerStory)
storyRoute.get("/getAll",isAuth,getAllStory)
storyRoute.get("/getstorybyusername/:userName",isAuth,getStoryByUsername)

export default storyRoute