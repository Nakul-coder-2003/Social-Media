import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import cors from "cors"
import postRoute from "./routes/post.route.js";
import reelRoute from "./routes/reel.route.js";
import storyRoute from "./routes/story.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket.js";

dotenv.config();

const port = 8000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user", userRouter)
app.use("/api/post",postRoute)
app.use("/api/reel",reelRoute)
app.use("/api/story",storyRoute)
app.use("/api/message",messageRoute)

server.listen(port,()=>{
    connectDB()
    console.log(`server is running on port ${port}`)
})