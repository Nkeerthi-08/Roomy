import { setResponse, setResponseWithError } from './response-handler.js';
import * as ReportService from '../services/report-service.js';

export const createReport = async (req, res) => {
  try {
    const report = req.body;
    report.user = req.user;

    const response = await ReportService.createReport(report);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const getUserReports = async (req, res) => {
  try {
    const userId = req.user._id;
    const response = await ReportService.getUserReports(userId);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const getAllReports = async (req, res) => {
  try {
    const response = await ReportService.getAllReports();
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const getReportById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await ReportService.getReportById(id);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const handleReport = async (req, res) => {
  try {
    const id = req.params.id;
    const handledBy = req.user;
    const status = req.body.status;

    const response = await ReportService.handleReport(id, handledBy, status);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};
