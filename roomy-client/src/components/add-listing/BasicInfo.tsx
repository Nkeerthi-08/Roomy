import { useState } from "react";
import { setBasicInfo, setStep } from "@/store/slices/addListing-slice";
import { useDispatch } from "react-redux";
import type { BasicInfo } from "@/store/slices/addListing-slice";
import { useAppSelector } from "@/store/store";
import AddressSearch from "../homepage/AddressSearch";
import { Address } from "@/store/services/address-service";

export default function BasicInfo() {
  const basicInfo = useAppSelector((state) => state.addListingSlice.basicInfo);
  const addressData: Address = basicInfo.streetAddress;

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      setBasicInfo(
        name === "streetAddress.streetAddress" ||
          name === "streetAddress.unitNo" ||
          name === "streetAddress.city" ||
          name === "streetAddress.stateCode" ||
          name === "streetAddress.zipCode"
          ? {
              ...basicInfo,
              streetAddress: {
                ...basicInfo.streetAddress,
                [name.split(".")[1]]: value,
              },
            }
          : {
              ...basicInfo,
              [name]: value,
            }
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setStep(1));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={basicInfo.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={basicInfo.phoneNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <AddressSearch></AddressSearch>

        <div className="mb-4 flex items-center space-x-4">
          <div className="flex-1">
            <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress.streetAddress"
              value={addressData.streetAddress}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="unitNo" className="block text-sm font-medium text-gray-700">
              Unit No.
            </label>
            <input
              type="text"
              id="unitNo"
              name="streetAddress.unitNo"
              value={addressData.unitNo}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mb-4 flex items-center space-x-4">
          <div className="flex-1">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="streetAddress.city"
              value={addressData.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="stateCode" className="block text-sm font-medium text-gray-700">
              State Code
            </label>
            <input
              type="text"
              id="stateCode"
              name="streetAddress.stateCode"
              value={addressData.stateCode}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="streetAddress.zipCode"
              value={addressData.zipCode}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="moveInDate" className="block text-sm font-medium text-gray-700">
            Move-in Date
          </label>
          <input
            type="date"
            id="moveInDate"
            name="moveInDate"
            value={basicInfo.moveInDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="bg-marine-blue text-white px-4 py-2 rounded-lg">
          Next Step
        </button>
      </form>
    </div>
  );
}