import mongoose from "mongoose";
import express from "express";
import cookieParser from 'cookie-parser'
const app = express();
app.use(express.json());
app.use(cookieParser());

import dotenv from "dotenv";
dotenv.config();
const { PORT, mongoDB } = process.env;

import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";


app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);


// Kết nối Db
const connectDB = async () => {
  try {
    await mongoose.connect(`${mongoDB}`);
    console.log("Mongodb connencted ");
    app.listen(PORT, () => {
      console.log(`Back-end is running ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
connectDB();
