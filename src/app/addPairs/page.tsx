"use client";

import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import NavbarLoggedIn from "@/components/Navigation/NavbarLoggedIn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function page() {
  return (
    <div>
      <NavbarLoggedIn />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 2,
          height: 700,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            m: 2,
          }}
        >
          <Box sx={{ m: 2 }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "text.disabled", mb: 2, width: 200, height: 50 }}
            >
              Add Image
            </Button>
            <Box
              sx={{ bgcolor: "text.disabled", width: 200, height: 200 }}
            ></Box>
          </Box>

          <Box
            sx={{
              bgcolor: "text.disabled",
              display: "flex",
              alignItems: "center",
              width: 300,
              height: 265,
            }}
          >
            Add comment or any information you would like to save about the
            image, report, or the patient
          </Box>

          <Box sx={{ m: 2 }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "text.disabled", mb: 2, width: 200, height: 50 }}
            >
              Add Report
            </Button>
            <Box
              sx={{ bgcolor: "text.disabled", width: 200, height: 200 }}
            ></Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: 300,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            py: 5,
          }}
        >
          <IconButton aria-label="Arrow">
            <ArrowBackIcon />
          </IconButton>
          <IconButton aria-label="Arrow">
            <ArrowForwardIcon />
          </IconButton>
        </Box>

        <Box>
          <Button
            variant="contained"
            sx={{ bgcolor: "text.disabled", mb: 2, width: 200, height: 50 }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default page;
