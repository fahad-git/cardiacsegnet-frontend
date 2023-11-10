import colors from "@/theme/Colors";
import { Box } from "@mui/material";
import React from "react";

export function navbar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 65,
        bgcolor: colors.lightBlue,
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
