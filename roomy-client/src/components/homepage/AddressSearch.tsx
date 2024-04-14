"use client";
import React, { useState } from "react";
import SearchBox from "./SearchBox";
import SearchResults from "./SearchResults";

export default function AddressSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    // Perform a search using the TomTom Search API
    const response = await fetch(
      `https://api.tomtom.com/search/2/search/${searchQuery}.json?key=7wrfpEwSd7EWHdmBmVH6L46RvgsJ1n3V&countrySet=US`
    );
    const data = await response.json();
    console.log("Search results:", data.results);
    setSearchResults(data.results);
  };

  const handleAddressClick = (address: any) => {
    // Handle when an address is clicked
    console.log("Clicked address:", address);
  };

  return (
    <div>
      <SearchBox
        value={searchQuery}
        onChange={(e: any) => setSearchQuery(e.target.value)}
        onSearch={handleSearch}
      />
      <SearchResults results={searchResults} onAddressClick={handleAddressClick} />
    </div>
  );
}
