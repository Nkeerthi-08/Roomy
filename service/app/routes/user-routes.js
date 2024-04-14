import express from "express";
import { passportAuth } from "../utils/passportAuth.js";
import * as UserController from "../controllers/user-controller.js";

const UserRouter = express.Router();

UserRouter.post("/login", UserController.login);
UserRouter.post("/register", UserController.register);
UserRouter.put(
  "/update",
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  UserController.update
);
UserRouter.delete(
  "/delete",
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  UserController.deleteUser
);

UserRouter.get(
  "/context",
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  UserController.getUserContext
);

export default UserRouter;
