// File: api/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import serverless from "serverless-http";

import authRoutes from "../routes/authRoutes.js"; // Adjust path if needed

dotenv.config();

let isConnected = false;

// Database connection (optimized for Vercel cold starts)
const connectDB = async () => {
  if (isConnected) return;
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME || "defaultDB", // optional
    });
    isConnected = conn.connections[0].readyState === 1; // connected state
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw new Error("Database connection failed");
  }
};

// Initialize Express app
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);
app.use(morgan("dev"));

// Connect DB before handling routes (cold starts)
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
  }
  next();
});

app.use("/api/auth", authRoutes);

// Export for Vercel
export const handler = serverless(app);


// import express from 'express';
// import dotenv from 'dotenv';
// import { connectDB } from './DB/connectDB.js';
// import authRoutes from './routes/authRoutes.js';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors({origin:"http://localhost:5173",credentials:true}));

// app.use(express.json());//to allow the parse incoming request with JSON data(reuqest.body) 
// app.use(cookieParser());// allow us to parse incoming cookies

// app.use("/api/auth",authRoutes);

// app.listen(PORT, () => {
//     connectDB();
//     console.log('Server is running on port:', PORT);
// });
