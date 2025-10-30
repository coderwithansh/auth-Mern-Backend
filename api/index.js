import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "../routes/authRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://authentication-frontend-lac.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URL);
  isConnected = true;
}
connectDB();

app.use("/api/auth", router);

export default app; // ✅ NO app.listen()
