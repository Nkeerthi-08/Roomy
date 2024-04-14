const postCreationTemplate = (name) => `<html>
<body>
  <h1>Your Post Has Been Created!</h1>
  <p>Dear ${name},</p>
  <p>Your post has been successfully created. Thank you for sharing your content with us!</p>
  <br>
  <p>Feel free to reach out to us if you have any questions or need assistance.</p>
  <p>Best regards,<br> The Roomy Team</p>
</body>
</html>`;

// Function to render the email template with dynamic data
export const renderPostCreationEmail = (name) => {
  return postCreationTemplate(name);
};
