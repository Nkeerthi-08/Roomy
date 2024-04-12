import { BlobServiceClient } from "@azure/storage-blob";

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
