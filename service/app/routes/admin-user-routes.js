import express from "express";
import passport from "passport";
import * as AdminUserController from "../controllers/admin-user-controller.js";

const AdminUserRouter = express.Router();

const passportAuth = (req, res, next) => {
  passport.authenticate(
    "admin-jwt",
    (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      if (!user) {
        return res.status(401).json({ message: info.message }); // Send back Passport.js error message
      }
      // Authentication successful, proceed with the route handler
      req.adminUser = user;
      next();
    },
    { session: false }
  )(req, res, next);
};

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

export default AdminUserRouter;
