import express from "express";
import { passportAuth } from "../utils/passportAuth.js";

import * as AdminUserController from "../controllers/admin-user-controller.js";

const AdminUserRouter = express.Router();

AdminUserRouter.get("/login", AdminUserController.login);
AdminUserRouter.post("/register", AdminUserController.register);
AdminUserRouter.put(
  "/update",
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  AdminUserController.update
);
AdminUserRouter.delete(
  "/delete",
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  AdminUserController.deleteUser
);
//console login 
export default AdminUserRouter;
