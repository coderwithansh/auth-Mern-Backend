import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "../routes/authRoutes.js"; 
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://authentication-frontend-lac.vercel.app"
    ],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URL);
  isConnected = true;
}
connectDB();

app.use("/api/auth", router);

export default app;

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
