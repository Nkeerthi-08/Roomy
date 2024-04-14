// SearchResults.js
"use client";
import React from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";

const SearchResults = ({ results, onAddressClick }: { results: any[]; onAddressClick: (result: any) => void }) => {
  return (
    <List>
      {results.map((result) => (
        <React.Fragment key={result.id}>
          <ListItem button onClick={() => onAddressClick(result)}>
            <ListItemText primary={result.address.streetName} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default SearchResults;
