// File: api/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

let isConnected = false; // connection cache

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
const app = express();

// Initialize Express app
// middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use((req, res, next) => {
  if (isConnected) {
    connectDB();
    console.log("✅ MongoDB already connected");
  }
  next();
});
//routes
app.use("/api/auth", router);

module.exports = app;

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
