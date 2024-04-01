import Post from "../models/post.js";

export const createPost = async (post) => {
  const res = await Post.create(post);

  if (!res) {
    throw new Error("Post not created");
  }

  return { message: "Post created", success: true };
};

export const getUserPosts = async (userId, approved = true) => {
  const res = await Post.find({ user: userId, approved: approved });

  if (!res) {
    throw new Error("Posts not found");
  }

  return res;
};

export const getAllPosts = async (approved = false) => {
  const res = await Post.find({ approved: approved });

  if (!res) {
    throw new Error("Posts not found");
  }

  return res;
};

export const getPostById = async (id) => {
  const res = await Post.findById(id);

  if (!res) {
    throw new Error("Post not found");
  }

  return res;
};

export const updatePost = async (id, updatedFields) => {
  const res = await Post.updateOne({ _id: id }, updatedFields);

  if (!res) {
    throw new Error("Post not updated");
  }

  return { message: "Post updated", success: true };
};

export const deletePost = async (id) => {
  const res = await Post.deleteOne({ _id: id });

  if (!res) {
    throw new Error("Post not deleted");
  }

  return { message: "Post deleted", success: true };
};

export const approvePost = async (id, approvedBy) => {
  // only admin can approve posts
  if (approvedBy.role !== "admin") {
    throw new Error("Only admin can approve posts");
  }

  const res = await Post.updateOne(
    { _id: id },
    { approved: true, approvedBy: approvedBy, approvedAt: new Date() }
  );

  if (!res) {
    throw new Error("Post not approved");
  }

  return { message: "Post approved", success: true };
};
