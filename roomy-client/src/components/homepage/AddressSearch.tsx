"use client";
import React, { useState } from "react";
import SearchBox from "./SearchBox";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultsList";

export default function AddressSearch() {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <div className="App">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          {results && results.length > 0 && <SearchResultsList results={results} />}
        </div>
      </div>
    </div>
  );
}
