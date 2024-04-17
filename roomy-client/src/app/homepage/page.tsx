import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import LogoutButton from "@/components/shared/LogoutButton";
import UserData from "@/components/homepage/UserData";
import AddressSearch from "@/components/homepage/AddressSearch";

export default function HomePage() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Roomy
          </Typography>
          <UserData></UserData>
          <LogoutButton></LogoutButton>
        </Toolbar>
      </AppBar>
      <h1>Location Search</h1>
      <AddressSearch></AddressSearch>
    </div>
  );
}
