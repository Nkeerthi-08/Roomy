import AdminUserRouter from "./admin-user-routes.js";

const ininializeRoutes = (app) => {
  app.use("/admin-users", AdminUserRouter);
};

export default ininializeRoutes;
