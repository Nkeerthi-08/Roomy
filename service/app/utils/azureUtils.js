import { BlobServiceClient } from "@azure/storage-blob";
import { EmailClient } from "@azure/communication-email";

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

export const sendEmail = async (emails, subject, message) => {
  try {
    const connectionString =
      process.env.AZURE_COMMUNICATION_EMAIL_CONNECTION_STRING;
    const emailClient = new EmailClient(connectionString);
    const emailMessage = {
      senderAddress:
        "DoNotReply@de7cd528-9236-46da-918d-e00feae21a17.azurecomm.net",
      content: {
        subject: subject,
        plainText: message,
        html: `<html>
            <body>
              <h1>${subject}</h1>
              <p>${message}</p>
            </body>
          </html>`,
      },
      recipients: {
        to: emails.map((email) => ({ address: email })),
      },
    };

    // const poller = await emailClient.beginSend(emailMessage);
    // const result = await poller.pollUntilDone();

    console.log("Email sent with message id: ", result);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
};
