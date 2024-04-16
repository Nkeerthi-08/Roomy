import Report from '../models/report.js';
import * as PostService from './post-service.js';
import { sendEmail } from '../utils/azureUtils.js';
import { renderReportCreationEmail } from '../templates/report-templates.js';

export const createReport = async (report) => {
  report.post = await PostService.getPostById(report.postId);

  // check if the user has already reported the post
  const existingReport = await Report.findOne({ user: report.user, post: report.post });

  if (existingReport) {
    throw new Error(`Report already exists for this post by ${report.user.email}`);
  }

  const res = await Report.create(report);

  if (!res) {
    throw new Error('Report not created');
  }

  sendEmail(
    [report.user.email],
    'New Report',
    'A new report has been created',
    renderReportCreationEmail(report.user.name, report, report.post)
  );
  return { message: 'Report created', success: true };
};

export const getUserReports = async (userId) => {
  const res = await Report.find({ user: userId });

  if (!res) {
    throw new Error('Reports not found');
  }

  return res;
};

export const getPostReports = async (postId) => {
  const res = await Report.find({ post: postId });

  if (!res) {
    throw new Error('Reports not found');
  }

  return res;
};

export const getAllReports = async (query = {}) => {
  // Execute the query
  const res = await Report.find(query);

  if (!res) {
    throw new Error('Reports not found');
  }

  return res;
};

export const getReportById = async (id) => {
  const res = await Report.findById(id);

  if (!res) {
    throw new Error('Report not found');
  }

  return res;
};

export const deleteReport = async (id) => {
  const res = await Report.deleteOne({ _id: id });

  if (!res) {
    throw new Error('Report not deleted');
  }

  return { message: 'Report deleted', success: true };
};

export const handleReport = async (id, handledBy, status) => {
  // only admin can handle reports
  if (handledBy.collection.modelName !== 'AdminUser') {
    throw new Error('Only admin can handle reports');
  }

  const res = await Report.updateOne(
    { _id: id },
    { status: status, handledBy: handledBy, handledAt: new Date() }
  );

  if (!res || res.nModified === 0) {
    throw new Error('Report not handled');
  }

  if (status === 'approved') {
    PostService.deactivatePost(res.post._id);
  }

  return { message: `Report ${status}`, success: true };
};
