"use client";
import { cn } from "@/utils/cn";
import BasicInfo from "./BasicInfo";
import UploadPhotos from "./UploadPhotos";
import { useAppSelector } from "@/store/store";
import { setStep } from "@/store/slices/addListing-slice";
import RoomDetailsForm from "./RoomDetails";
import ConformationForm from "./ConformationForm";

export default function AddListingForm() {
  const step = useAppSelector((state) => state.addListingSlice.step);

  return (
    <div className="relative flex min-h-screen w-screen flex-col rounded-2xl bg-white lg:min-h-fit lg:w-fit lg:flex-row lg:p-4">
      <div className="absolute flex w-full gap-4 lg:relative lg:w-fit">
        <picture className="w-full">
          <source srcSet="/bg-sidebar-desktop.svg" media="(min-width: 1024px)" className="-z-10 select-none" />
          <img src="/bg-sidebar-mobile.svg" className="w-full" alt="" />
        </picture>

        <ul className="absolute flex w-full justify-center gap-6 p-10 text-white lg:inset-0 lg:flex-col lg:justify-start">
          {["Your Info", "Select Plan", "Add-ons", "Summary"].map((title, index) => (
            <li className="flex items-center gap-4" key={title}>
              <div
                className={cn(
                  "grid h-10 w-10 place-content-center rounded-full border font-bold",
                  index === step && "bg-light-blue text-purplish-blue"
                )}
              >
                {index + 1}
              </div>

              <div className="hidden text-start lg:block">
                <p className="text-white">STEP {index + 1}</p>
                <h2 className="font-bold uppercase text-white">{title}</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {step === 0 && (
        <div className="page-container">
          <BasicInfo></BasicInfo>
        </div>
      )}
      {step === 1 && (
        <div className="page-container">
          <UploadPhotos></UploadPhotos>
        </div>
      )}
      {step === 2 && (
        <div className="page-container">
          <RoomDetailsForm></RoomDetailsForm>
        </div>
      )}
      {step === 3 && (
        <div className="page-container">
          <ConformationForm></ConformationForm>
        </div>
      )}
    </div>
  );
}
