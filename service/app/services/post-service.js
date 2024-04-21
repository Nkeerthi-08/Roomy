import Post from '../models/post.js';
import {
  renderPostApprovalEmail,
  renderPostCreationEmail,
  renderPostDeactivationEmail,
} from '../templates/post-templates.js';
import { sendEmail, uploadPhotos } from '../utils/azureUtils.js';
import User from '../models/user.js';

/**
 * Creates a new post.
 * @param {Object} post - The post object containing the post details.
 * @returns {Promise<Object>} - A promise that resolves to an object with a success message.
 * @throws {Error} - If the post is not created.
 */
export const createPost = async (post) => {
  const photos = post.photos;
  const res = new Post(post);
  const photoUrls = await uploadPhotos(res._id, photos);
  res.photos = photoUrls;
  await res.save();

  if (!res) {
    throw new Error('Post not created');
  }

  sendEmail(
    [res.user.email],
    'New Post',
    'A new post has been created',
    renderPostCreationEmail(res.user.name, post.title)
  );
  return { message: 'Post created', success: true };
};

export const getUserPosts = async (userId) => {
  const res = await Post.find({ user: userId });

  if (!res) {
    throw new Error('Posts not found');
  }

  return res;
};

export const getAllPosts = async (query = {}) => {
  if (query.userEmail) {
    const user = await User.findOne({ email: query.userEmail });
    if (!user) {
      return [];
    }
    query.user = user._id;
    delete query.userEmail;
  }

  // get all associated users and sort by latest first
  const posts = await Post.find(query)
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
  //

  if (!posts) {
    throw new Error('Posts not found');
  }

  return posts;
};

export const getPostById = async (id) => {
  if (!id) throw new Error('Post ID is required');

  const res = await Post.findById(id);

  if (!res) {
    throw new Error('Post not found');
  }

  return res;
};

export const updatePost = async (id, updatedFields) => {
  const res = await Post.updateOne({ _id: id }, updatedFields);

  if (!res) {
    throw new Error('Post not updated');
  }

  return { message: 'Post updated', success: true };
};

export const deletePost = async (id) => {
  const res = await Post.deleteOne({ _id: id });

  if (!res) {
    throw new Error('Post not deleted');
  }

  return { message: 'Post deleted', success: true };
};

/**
 * Approves a post.
 *
 * @param {string} id - The ID of the post to be approved.
 * @param {object} approvedBy - The user who is approving the post.
 * @returns {Promise<object>} - A promise that resolves to an object containing the approval status and message.
 * @throws {Error} - If the user is not an admin or if the post is not approved.
 */
export const approvePost = async (id, approvedBy) => {
  if (!id) {
    throw new Error('Post ID is required');
  }

  // only admin can approve posts
  if (approvedBy.collection.modelName !== 'AdminUser') {
    throw new Error('Only admin can approve posts');
  }

  const post = await Post.findById(id);
  if (!post) {
    throw new Error('Post not found');
  }

  if (post.approved) {
    throw new Error('Post already approved');
  }

  if (!post.active) {
    throw new Error('Post is not active');
  }

  const res = await Post.updateOne(
    { _id: id },
    { approved: true, approvedBy: approvedBy, approvedAt: new Date() }
    // { approved: false, approvedBy: approvedBy, approvedAt: new Date() }
  );

  if (!res || res.nModified === 0) {
    throw new Error('Post not approved');
  }

  const user = await User.findById(post.user);

  sendEmail(
    [user.email],
    'Post Approved',
    'Your post has been approved',
    renderPostApprovalEmail(user.name, post.title)
  );

  return { message: 'Post approved', success: true };
};

export const deactivatePost = async (id) => {
  const post = await Post.findById(id).populate('user', 'name email');
  const res = await Post.updateOne({ _id: id }, { active: false }, { new: true });

  if (!res || res.nModified === 0) {
    throw new Error('Post not deactivated');
  }

  sendEmail(
    [post.user.email],
    'Post Deactivated',
    'Your post has been deactivated',
    renderPostDeactivationEmail(post.user.name, post.title)
  );

  return { message: 'Post deactivated', success: true };
};
