import Post from "../models/post.js";
import { BlobServiceClient } from "@azure/storage-blob";

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

/**
 * Approves a post.
 *
 * @param {string} id - The ID of the post to be approved.
 * @param {object} approvedBy - The user who is approving the post.
 * @returns {Promise<object>} - A promise that resolves to an object containing the approval status and message.
 * @throws {Error} - If the user is not an admin or if the post is not approved.
 */
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

/**
 * Uploads photos to Azure Blob Storage.
 *
 * @param {string} id - The ID of the post.
 * @param {Array} photos - An array of photo objects.
 * @returns {Promise<Array>} - A promise that resolves to an array of photo URLs.
 * @throws {Error} - If there is an error uploading the photos.
 */
export const uploadPhotos = async (id, photos) => {
  try {
    // Establishes a connection with Azure Blob Storage
    const blobServiceClient = new BlobServiceClient(
      process.env.BLOB_SERVICE_URL
    );
    const containerClient = blobServiceClient.getContainerClient(
      process.env.AZURE_STORAGE_CONTAINER_NAME
    );

    // upload each photo to the blob storage
    const photoUrls = [];
    for (const photo of photos) {
      const blobName = `${id}-${photo.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.upload(photo.buffer, photo.size);
      photoUrls.push({ url: blockBlobClient.url });
    }

    return photoUrls;
  } catch (error) {
    throw new Error(`Error uploading photos: ${error.message}`);
  }
};
