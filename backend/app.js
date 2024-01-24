import mongoose from "mongoose";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const { PORT, mongoDB } = process.env;

app.use(express.json());

import productRoutes from "./routes/products.js";

app.use("/api/v1", productRoutes);

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
