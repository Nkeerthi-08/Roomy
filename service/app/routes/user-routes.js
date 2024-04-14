import express from "express";
import passport from "passport";
import * as UserController from "../controllers/user-controller.js";

const UserRouter = express.Router();

const passportAuth = (req, res, next) => {
  passport.authenticate(
    "user-jwt",
    (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (!user) {
        return res.status(401).json({ message: info.message }); // Send back Passport.js error message
      }
      // Authentication successful, proceed with the route handler
      req.user = user;
      next();
    },
    { session: false }
  )(req, res, next);
};

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

export default UserRouter;
