"use client";

import React from "react";
import { Box } from "@mui/material";
import Navbar from "@/components/Navbar";

function page() {
  return (
    <div>
      <Navbar />
      <div  style={{  }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            m: 2,
            height: 1000,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "stretch",
              width: "70%",
              pr: 2,
            }}
          >
            <Box sx={{ bgcolor: "text.disabled", height: "10%", mb: 1 }}>Drawing/Editing tool</Box>
            <Box sx={{ bgcolor: "text.disabled", height: "90%" }}>Image</Box>
          </Box>
          <Box sx={{ bgcolor: "text.disabled", width: "30%" }}>Comments</Box>
        </Box>
      </div>
    </div>
  );
}

export default page;
