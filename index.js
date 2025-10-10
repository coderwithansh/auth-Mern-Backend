import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './DB/connectDB.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin:"http://localhost:5173",credentials:true}));

app.use(express.json());//to allow the parse incoming request with JSON data(reuqest.body) 
app.use(cookieParser());// allow us to parse incoming cookies

app.use("/api/auth",authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port:', PORT);
});