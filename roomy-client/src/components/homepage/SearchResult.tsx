import { Address } from "@/store/services/address-service";
import "./css/SearchResult.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setAddress } from "@/store/slices/addListing-slice";
import { Dispatch, SetStateAction } from "react";

interface SearchResultProps {
  result: Address;
  showResults: Dispatch<SetStateAction<boolean>>;
}

export const SearchResult = ({ result, showResults }: SearchResultProps) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      className="search-result"
      onClick={() => {
        dispatch(setAddress(result));
        showResults(false);
      }}
    >
      {`${result.streetAddress}`}
    </div>
  );
};
