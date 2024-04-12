import express from "express";
import passport from "passport";
import * as PostController from "../controllers/post-controller.js";
import multer from "multer";

const upload = multer({});

const PostRouter = express.Router();

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

PostRouter.post(
  "/create",
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  upload.array("photos", 10),
  PostController.createPost
);

PostRouter.get(
  "/user-posts",
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  PostController.getUserPosts
);

PostRouter.get("/all-posts", PostController.getAllPosts);

PostRouter.get("/:id", PostController.getPostById);

PostRouter.put(
  "/:id",
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  PostController.updatePost
);

PostRouter.delete(
  "/:id",
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  PostController.deletePost
);

export default PostRouter;
