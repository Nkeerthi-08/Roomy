import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Address } from "../services/address-service";
import { loadState, saveState } from "@/utils/addListing-local";

export enum FacilitiesEnum {
  Heat = "Heat",
  Water = "Water",
  Electricity = "Electricity",
  Gas = "Gas",
}
type StepInfo = number;

export type BasicInfo = {
  title: string;
  phoneNumber: string;
  streetAddress: Address;
  moveInDate: string;
};

type PhotosInfo = {
  photos: string[];
};

type RoomDetails = {
  rent: number;
  bath: number;
  bed: number;
  facilities: string[];
  laundry: boolean;
};

type InitialState = {
  step: StepInfo;
  basicInfo: BasicInfo;
  photosInfo: PhotosInfo;
  roomDetails: RoomDetails;
};
const initialState: InitialState = loadState("addListingState") || {
  step: 0,
  basicInfo: {
    title: "",
    phoneNumber: "",
    streetAddress: {
      streetAddress: "",
      unitNo: "",
      city: "",
      stateCode: "",
      zipCode: "",
      latitude: 0,
      longitude: 0,
    },
    moveInDate: "",
  },
  photosInfo: {
    photos: [],
  },
  roomDetails: {
    rent: 0,
    bath: 0,
    bed: 0,
    facilities: [],
    laundry: false,
  },
};
const addListingSlice = createSlice({
  name: "addListing",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<StepInfo>) => {
      state.step = action.payload;
      saveState("addListingState", state);
    },
    setBasicInfo: (state, action: PayloadAction<BasicInfo>) => {
      state.basicInfo = action.payload;
      saveState("addListingState", state);
    },
    setPhotosInfo: (state, action: PayloadAction<PhotosInfo>) => {
      state.photosInfo = action.payload;
      console.log(state.photosInfo.photos, "photos info from slice");
      // saveState("addListingState", state);
    },
    addPhotoInfo: (state, action: PayloadAction<string>) => {
      state.photosInfo.photos.push(action.payload);
      console.log(state.photosInfo.photos, "photos info from slice");
      saveState("addListingState", state);
    },

    setRoomDetails: (state, action: PayloadAction<RoomDetails>) => {
      state.roomDetails = action.payload;
      saveState("addListingState", state);
    },
    //set RoomDetails individually to update the state
    setRentInfo(state, action: PayloadAction<number>) {
      state.roomDetails.rent = action.payload;
      saveState("addListingState", state);
    },
    setBathInfo(state, action: PayloadAction<number>) {
      state.roomDetails.bath = action.payload;
      saveState("addListingState", state);
    },
    setBedInfo(state, action: PayloadAction<number>) {
      state.roomDetails.bed = action.payload;
      saveState("addListingState", state);
    },
    setFacilities(state, action: PayloadAction<string[]>) {
      state.roomDetails.facilities = action.payload;
      saveState("addListingState", state);
    },
    setLaundry(state, action: PayloadAction<boolean>) {
      state.roomDetails.laundry = action.payload;
      saveState("addListingState", state);
    },
    setAddress(state, action: PayloadAction<Address>) {
      state.basicInfo.streetAddress = action.payload;
      saveState("addListingState", state);
    },
  },
});

export const {
  setStep,
  setBasicInfo,
  setPhotosInfo,
  addPhotoInfo,
  setRoomDetails,
  setAddress,
  setRentInfo,
  setBathInfo,
  setBedInfo,
  setFacilities,
  setLaundry,
} = addListingSlice.actions;

export default addListingSlice.reducer;
