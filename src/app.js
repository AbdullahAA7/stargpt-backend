//importing packages/files
import express from "express";
import starRouter from "./routes/starRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();
//Variables
const app = express();
const cookieSecret = process.env.COOKIE_SECRET;
//middlewares
app.use(
  cors({
    origin: `https://stargpt1.vercel.app`,
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(cookieSecret));
app.use("/star", starRouter); // Domain/star => starRouter.js
//we will remove this at the time of deployment
export default app;
