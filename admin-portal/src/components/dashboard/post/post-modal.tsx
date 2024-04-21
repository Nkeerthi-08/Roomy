import 'react-image-gallery/styles/css/image-gallery.css';

import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageGallery from 'react-image-gallery';

import { type Post } from '@/types/post';

export default function PostModal({
  selectedPost,
  handleCloseModal,
}: {
  selectedPost: Post;
  handleCloseModal: () => void;
}): React.JSX.Element {
  const images = selectedPost.photos.map((photo: { url: string }) => ({
    original: photo.url,
    thumbnail: photo.url, // Use the same URL for both original and thumbnail for simplicity
    originalAlt: selectedPost.title,
    thumbnailAlt: selectedPost.title,
  }));

  return (
    <div>
      <Dialog open={Boolean(selectedPost)} onClose={handleCloseModal} maxWidth="lg" fullWidth>
        <DialogTitle>{selectedPost.title}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Description</Typography>
          <Typography>{selectedPost.description}</Typography>

          <Typography variant="subtitle1" mt={2}>
            Property Details
          </Typography>
          <Typography>
            Street Address: {selectedPost.streetAddress}, {selectedPost.unitNo}
          </Typography>
          <Typography>
            City: {selectedPost.city}, State: {selectedPost.stateCode}, Zip: {selectedPost.zipCode}
          </Typography>
          <Typography>
            Latitude: {selectedPost.latitude}, Longitude: {selectedPost.longitude}
          </Typography>
          <Typography>Phone Number: {selectedPost.phoneNumber}</Typography>
          <Typography>Start Date: {new Date(selectedPost?.startDateRange).toLocaleDateString()}</Typography>
          <Typography>Price: ${selectedPost.price}</Typography>
          <Typography>Bedrooms: {selectedPost.bedCount}</Typography>
          <Typography>Bathrooms: {selectedPost.bathCount}</Typography>
          <Typography>Utilities: {selectedPost.utilities.join(', ')}</Typography>
          <Typography>Amenities: {selectedPost.amenities.join(', ')}</Typography>

          <Typography variant="subtitle1" mt={2}>
            User Details
          </Typography>
          <Typography>User Email: {selectedPost.user.email}</Typography>
          <Typography>User Name: {selectedPost.user.name}</Typography>

          <Typography variant="subtitle1" mt={2}>
            Other Details
          </Typography>
          <Typography>Active: {selectedPost.active ? 'Yes' : 'No'}</Typography>
          <Typography>Approved: {selectedPost.approved ? 'Yes' : 'No'}</Typography>
          <Typography>Created At: {new Date(selectedPost.createdAt).toLocaleString()}</Typography>

          <Typography variant="subtitle1" mt={2}>
            Photos
          </Typography>
          <ImageGallery items={images} showThumbnails showFullscreenButton showPlayButton={false} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
