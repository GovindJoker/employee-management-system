import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";


import router from './routes/index.js';
import { errorHandler } from "./middleware/error.middleware.js";


const app= express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));



app.use('/api/v1',router)

app.use(errorHandler)

export default app;