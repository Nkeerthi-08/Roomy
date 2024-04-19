import { setStep } from "@/store/slices/addListing-slice";
import { useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

export default function NEWConformationForm() {
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
      <div className="flex-1 min-w-0 mt-8 lg:mt-0">
        <div
          className="bg-white rounded-3xl shadow-lg p-8 max-w-md mx-auto lg:mx-0"
          style={{ height: "600px", overflowY: "auto" }}
        >
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <div>
              <div>Title: {basicInfo.title}</div>
              <div>Phone Number: {basicInfo.phoneNumber}</div>
              <div>Street Address: {basicInfo.streetAddress.streetAddress}</div>
              <div>Unit No: {basicInfo.streetAddress.unitNo}</div>
              <div>City: {basicInfo.streetAddress.city}</div>
              <div>State Code: {basicInfo.streetAddress.stateCode}</div>
              <div>Zip Code: {basicInfo.streetAddress.zipCode}</div>
              <div>Move In Date: {basicInfo.moveInDate}</div>
            </div>
            <h2 className="text-xl font-semibold">Photos Information</h2>
            <div className="grid grid-cols-2 gap-4">
              {photosInfo.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width={200}
                  height={200}
                />
              ))}
            </div>
            <h2 className="text-xl font-semibold">Room Details</h2>
            <div className="overflow-y-auto max-h-36">
              <div>Rent: {roomDetails.rent}</div>
              <div>Bath: {roomDetails.bath}</div>
              <div>Bed: {roomDetails.bed}</div>
              <div>Facilities: {roomDetails.facilities.join(", ")}</div>
            </div>
            <div>
              <div style={{ height: "30px" }}></div>
            </div>
            <Button onClick={handleSubmit}>Publish</Button>
            <Button onClick={handleBack} variant="ghost">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
