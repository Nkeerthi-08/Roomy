import { Key } from "react";
import { SearchResult } from "./SearchResult";
import "./css/SearchResultsList.css";

export const SearchResultsList = ({ results }: { results: any }) => {
  return (
    <div className="results-list">
      {results.map(
        (
          result: {
            streetNumber: any;
            streetName: any;
            municipality: any;
            postalCode: any;
          },
          id: Key | null | undefined
        ) => {
          return (
            <SearchResult
              result={
                result.streetNumber +
                " " +
                result.streetName +
                ", " +
                result.municipality +
                ", " +
                result.postalCode
              }
              key={id}
            />
          );
        }
      )}
      {/* {results.map((result: { name: any }, id: Key | null | undefined) => {
        return <SearchResult result={result.name} key={id} />;
      })} */}
    </div>
  );
};
