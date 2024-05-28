// npm i express dotenv cookie-parser bcryptjs mongoose socket.io jsonwebtoken
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import connectDB from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 6666;
connectDB();

const app = express()

app.use(express.json());
app.use(cookieParser());

app.use("/apple-chat/auth", authRoutes);
app.use("/apple-chat/messages", messageRoutes);
app.use("/apple-chat/users", userRoutes);
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
