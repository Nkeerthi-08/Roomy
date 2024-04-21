import { setResponse, setResponseWithError } from './response-handler.js';
import * as PostService from '../services/post-service.js';
import Post from '../models/post.js';

export const createPost = async (req, res) => {
  try {
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

    if (req.query.priceMin) {
      req.query.price = { $gte: req.query.priceMin };
      delete req.query.priceMin;
    }

    if (req.query.priceMax) {
      req.query.price = { ...req.query.price, $lte: req.query.priceMax };
      delete req.query.priceMax;
    }

    if (req.query.bedCount) {
      req.query.bedCount = { $gte: req.query.bedCount };
    }

    if (req.query.bathCount) {
      req.query.bathCount = { $gte: req.query.bathCount };
    }

    if (req.query.startDateRange) {
      req.query.startDateRange = { $gte: new Date(req.query.startDateRange) };
    }

    if (req.query.endDateRange) {
      req.query.endDateRange = { $lte: new Date(req.query.endDateRange) };
    }

    // remove any empty fields
    Object.keys(req.query).forEach((key) => {
      if (!req.query[key]) {
        delete req.query[key];
      }
    });

    // remove any extra fields that are not in the schema
    const validFields = Post.schema.obj;
    Object.keys(req.query).forEach((key) => {
      if (!validFields[key]) {
        delete req.query[key];
      }
    });

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
