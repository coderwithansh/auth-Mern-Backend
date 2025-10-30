import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "../routes/authRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// --- CORS ---
app.use(cors({
  origin: "https://authentication-frontend-lac.vercel.app",
  credentials: true
}));

// --- Middlewares ---
app.use(express.json());
app.use(cookieParser());

// --- Mongo connection cached ---
let conn = null;
async function connectDB() {
  if (conn) return;
  conn = await mongoose.connect(process.env.MONGO_URL);
  console.log("✅ MongoDB connected");
}
connectDB();

// --- Routes ---
app.use("/api/auth", router);

// ✅ Export as serverless function
export default app;
