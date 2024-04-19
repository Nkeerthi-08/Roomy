import { addPhotoInfo, setStep } from "@/store/slices/addListing-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/store";
import { useState } from "react";
import "./css/add-listing.css";

export default function UploadPhotos() {
  const photosInfo = useAppSelector((state) => state.addListingSlice.photosInfo);
  const dispatch = useDispatch();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhoto = files[0];
      const newPhotoUrl = URL.createObjectURL(newPhoto);
      dispatch(addPhotoInfo(newPhotoUrl));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setStep(2));
  };
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setStep(0));
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          <div className="selected-photos">
            {photosInfo.photos.map((url, index) => (
              <img key={index} src={url} alt={`Photo ${index}`} className="selected-photo" />
            ))}
          </div>
          <button onClick={handleBack} className="bg-marine-blue text-white px-4 py-2 rounded-lg">
            Back
          </button>
          <button type="submit" className="bg-marine-blue text-white px-4 py-2 rounded-lg">
            Next Step
          </button>
        </form>
      </div>
    </>
  );
}
