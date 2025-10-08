import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './DB/connectDB.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Vercel ke environment me dirname handle karne ke liye:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 5000;

app.use(cors({ 
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());//to allow the parse incoming request with JSON data(reuqest.body) 
app.use(cookieParser());// allow us to parse incoming cookies

app.use("/api/auth",authRoutes);

export default app;
// app.listen(PORT, () => {
//     connectDB();
//     console.log('Server is running on port:', PORT);
// });