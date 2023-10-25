import { Box } from "@mui/material";
import React from "react";

export function navbar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 60,
        bgcolor: "#EAE1E1",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
    <p> Medical Image Analytics </p>  
    </Box>
  );
}

export default navbar;
