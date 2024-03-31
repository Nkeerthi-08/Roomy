import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ininializeRoutes from "./routes/index.js";
import passport from "passport";
import { initPassport } from "./middlewares/passport-config.js";

const init = (app) => {
  const MONGO_URI = process.env.MONGO_CONNECTION_STRING;

  initPassport(passport);

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected to MongoDB");

  ininializeRoutes(app);
};

export default init;
