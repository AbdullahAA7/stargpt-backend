//importing packages/files

import app from "./app.js";
import { connectDB } from "./DB/connect.js";

//Variables
const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  console.log("Connected to database ");
});

export default app;
