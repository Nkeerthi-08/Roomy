import { setResponse, setResponseWithError } from "./response-handler.js";
import * as PostService from "../services/post-service.js";

export const createPost = async (req, res) => {
  try {
    const post = req.body;
    post.user = req.user._id;
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

export const getAllPosts = async (req, res) => {
  try {
    const response = await PostService.getAllPosts();
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
