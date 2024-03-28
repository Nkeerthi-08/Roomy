import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ininializeRoutes from "./routes/index.js";

const init = (app) => {
  const MONGO_URI = process.env.MONGO_CONNECTION_STRING;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected to MongoDB");

  ininializeRoutes(app);
};

export default init;
