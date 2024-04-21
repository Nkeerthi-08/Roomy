import { setResponse, setResponseWithError } from './response-handler.js';
import * as PostService from '../services/post-service.js';

export const createPost = async (req, res) => {
  try {
    console.log(req.body);
    const post = req.body;
    post.user = req.user;
    post.photos = req.files;
    const response = await PostService.createPost(post);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const response = await PostService.getUserPosts(userId);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const getPosts = async (req, res) => {
  try {
    // only fetch approved posts and active posts
    req.query.approved = true;
    req.query.active = true;

    const response = await PostService.getAllPosts(req.query);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const response = await PostService.getAllPosts(req.query);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await PostService.getPostById(id);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;
    const response = await PostService.updatePost(id, updatedFields);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await PostService.deletePost(id);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const approvePost = async (req, res) => {
  try {
    const id = req.params.id;
    const adminUser = req.adminUser;
    const response = await PostService.approvePost(id, adminUser);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const approveAllPosts = async (req, res) => {
  try {
    const adminUser = req.adminUser;

    const posts = await PostService.getAllPosts({});
    // const posts = await PostService.getAllPosts({ approved: true });

    if (!posts.length) {
      throw new Error('No posts to approve');
    }

    posts.forEach(async (post) => {
      await PostService.approvePost(post._id, adminUser);
    });

    setResponse(res, { message: 'All posts approved', success: true });
  } catch (error) {
    setResponseWithError(res, error);
  }
};
