import express from 'express';
import { passportAuth, passportAdminUserAuth } from '../utils/passportAuth.js';
import * as ReportController from '../controllers/report-controller.js';

const ReportRouter = express.Router();

ReportRouter.post(
  '/create',
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  ReportController.createReport
);

ReportRouter.get(
  '/user-reports',
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  ReportController.getUserReports
);

ReportRouter.get('/all-reports', ReportController.getAllReports);

ReportRouter.get('/:id', ReportController.getReportById);

ReportRouter.put(
  '/:id',
  (req, res, next) => {
    passportAdminUserAuth(req, res, next);
  },
  ReportController.handleReport
);

export default ReportRouter;
