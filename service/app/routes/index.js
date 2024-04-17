import AdminUserRouter from './admin-user-routes.js';
import UserRouter from './user-routes.js';
import PostRouter from './post-routes.js';
import ReportRouter from './report-routes.js';
import PaymentSubscriptionRouter from './payment-subscription-routes.js';

const ininializeRoutes = (app) => {
  app.use('/users', UserRouter);
  app.use('/admin-users', AdminUserRouter);
  app.use('/posts', PostRouter);
  app.use('/reports', ReportRouter);
  app.use('/create-stripe-session-subscription', PaymentSubscriptionRouter);
};

export default ininializeRoutes;
