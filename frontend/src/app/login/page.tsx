"use client";

import React from "react";
import { Box, Input } from "@mui/material";
import Button from "@mui/material/Button";
import Navbar from "@/components/Navbar";

function page() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "10%",
        }}
      >
        <div>
          <p> Username </p>
          <Input
            placeholder="..."
            sx={{ bgcolor: "text.disabled", height: 50, width: 300 }}
          />
        </div>
        <div style={{ padding: "4%" }}>
          <p> Password </p>
          <Input
            placeholder="..."
            sx={{ bgcolor: "text.disabled", height: 50, width: 300 }}
          />
        </div>
        <Button
          onClick={() => {
            alert("You clicked me!");
          }}
          sx={{ height: 50, width: 100, border: "1px solid grey" }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            alert("You clicked me!");
          }}
          sx={{ padding: "4%" }}
        >
          Register user
        </Button>
        <Button
          onClick={() => {
            alert("You clicked me!");
          }}
          sx={{ color: "text.secondary" }}
        >
          Enter as guest
        </Button>
      </Box>
    </div>
  );
}

export default page;
