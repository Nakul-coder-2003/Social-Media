import express from "express"
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";
import { getAllMessages, getPrevUserChat, sendMessage } from "../controllers/message.controller.js";

const messageRoute = express.Router();

messageRoute.post("/send/:receiverId",isAuth,upload.single("image"),sendMessage)
messageRoute.get("/getAll/:receiverId",isAuth,getAllMessages)
messageRoute.get("/prevChats",isAuth,getPrevUserChat)

export default messageRoute