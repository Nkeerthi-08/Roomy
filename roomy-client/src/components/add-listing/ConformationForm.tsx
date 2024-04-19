import React from "react";
import { useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { setStep } from "@/store/slices/addListing-slice";

export default function ConformationForm() {
  const { basicInfo, photosInfo, roomDetails } = useAppSelector((state) => state.addListingSlice);

  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setStep(3));
  };
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setStep(2));
  };

  return (
    <>
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
          <p>Title: {basicInfo.title}</p>
          <p>Phone Number: {basicInfo.phoneNumber}</p>
          <p>Street Address: {basicInfo.streetAddress.streetAddress}</p>
          <p>Unit No: {basicInfo.streetAddress.unitNo}</p>
          <p>City: {basicInfo.streetAddress.city}</p>
          <p>State Code: {basicInfo.streetAddress.stateCode}</p>
          <p>Zip Code: {basicInfo.streetAddress.zipCode}</p>
          <p>Move In Date: {basicInfo.moveInDate}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Photos Information</h2>
          <div className="flex">
            {photosInfo.photos.map((photo, index) => (
              <img key={index} src={photo} alt={`Photo ${index + 1}`} className="w-24 h-24 mr-2" />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Room Details</h2>
          <p>Rent: {roomDetails.rent}</p>
          <p>Bath: {roomDetails.bath}</p>
          <p>Bed: {roomDetails.bed}</p>
          <p>Facilities: {roomDetails.facilities.join(", ")}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={handleBack} className="bg-marine-blue text-white px-4 py-2 rounded-lg">
          Back
        </button>
        <button onClick={handleSubmit} className="bg-marine-blue text-white px-4 py-2 rounded-lg">
          Next Step
        </button>
      </div>
    </>
  );
}
