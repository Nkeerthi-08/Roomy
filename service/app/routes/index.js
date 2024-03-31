import AdminUserRouter from "./admin-user-routes.js";
import UserRouter from "./user-routes.js";

const ininializeRoutes = (app) => {
  app.use("/users", UserRouter);
  app.use("/admin-users", AdminUserRouter);
};

export default ininializeRoutes;
