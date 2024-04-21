import Report from '../models/report.js';
import * as PostService from './post-service.js';
import * as UserService from './user-service.js';
import { sendEmail } from '../utils/azureUtils.js';
import { renderReportCreationEmail } from '../templates/report-templates.js';
import logger from '../utils/logger.js';

export const createReport = async (report) => {
  report.post = await PostService.getPostById(report.postId);

  if (!report.post) {
    throw new Error('Post not found');
  }

  if (!report.post.active) {
    throw new Error('Post is already deactivated');
  }

  if (!report.post.approved) {
    throw new Error('Post needs to be approved before reporting');
  }

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
  const res = [];
  try {
    // Find the user document based on the userEmail

    let user = null;
    if (query.userEmail) {
      user = await UserService.getUser({ email: query.userEmail });
    }
    if (user) {
      query.user = user._id;
      delete query.userEmail;
    }

    const res = await Report.find(query)
      .populate([
        { path: 'user', select: 'name email', model: 'User' },
        { path: 'post' },
        { path: 'handledBy', select: 'name email', model: 'AdminUser' },
      ])
      .sort({ createdAt: -1 });

    return res;
  } catch (error) {
    logger.error(error);
    return [];
  }

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
  if (!id || !handledBy || !status) {
    throw new Error('Missing required fields');
  }

  if (!['approved', 'rejected'].includes(status)) {
    throw new Error('Invalid status');
  }

  // Only admin can handle reports
  if (handledBy.collection.modelName !== 'AdminUser') {
    throw new Error('Only admin can handle reports');
  }

  // Fetch the report record along with the post ID
  const report = await Report.findById(id).select('post').lean();

  if (!report) {
    throw new Error('Report not found');
  }

  // Update the report status and get the updated document
  const updatedReport = await Report.findByIdAndUpdate(
    id,
    { status, handledBy, handledAt: new Date() },
    { new: true }
  ).lean();

  if (!updatedReport) {
    throw new Error('Report not handled');
  }

  // If status is approved, deactivate the post
  if (status === 'approved' && report.post) {
    await PostService.deactivatePost(report.post._id);

    await Report.updateMany(
      { post: report.post._id },
      { status: 'approved', handledBy, handledAt: new Date() }
    );
  }

  return { message: `Report ${status}`, success: true };
};
