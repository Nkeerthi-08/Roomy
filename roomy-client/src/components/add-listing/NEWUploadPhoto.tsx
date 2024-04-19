import { useAppSelector } from "@/store/store";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addPhotoInfo, setStep } from "@/store/slices/addListing-slice";

export default function NEWUploadPhoto() {
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
      <div className="flex-1 min-w-0 mt-8 lg:mt-0">
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md mx-auto lg:mx-0">
          <div className="flex flex-col space-y-4">
            <div>
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
              <div className="grid grid-cols-3 gap-4">
                {photosInfo.photos.map((url, index) => (
                  <img key={index} src={url} alt={`Photo ${index}`} className="w-full h-auto rounded-lg" />
                ))}
              </div>
              <div className="flex justify-between mt-96">
                <Button onClick={handleBack} variant="ghost">
                  Go Back
                </Button>
                <Button onClick={handleSubmit}>Next Step</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
