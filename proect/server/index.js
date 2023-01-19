import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();

//// middleWare
app.use(cors());
app.use(express.json());

//// Routes
app.use("/api/auth", authRoute);

//// env constans
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const SECRET = process.env.SECRET

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://test:test123@cluster0.yqn37gm.mongodb.net/mern?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => {
      console.log(`server start ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
