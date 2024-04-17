import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./css/SearchBar.css";

export const SearchBar = ({ setResults }: { setResults: any }) => {
  const [input, setInput] = useState("");

  const fetchData = (value: string) => {
    fetch(
      `https://api.tomtom.com/search/2/search/${value}.json?key=7wrfpEwSd7EWHdmBmVH6L46RvgsJ1n3V&countrySet=US`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("Search results:", json.results);
        const filteredResults = json.results.map((result: any) => {
          return {
            streetNumber: result.address.streetNumber || "",
            streetName: result.address.streetName || "",
            municipality: result.address.municipality || "",
            postalCode: result.address.postalCode || "",
          };
        });
        console.log("Filtered results:", filteredResults);
        setResults(filteredResults);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (value: any) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input placeholder="Type to search..." value={input} onChange={(e) => handleChange(e.target.value)} />
    </div>
  );
};
