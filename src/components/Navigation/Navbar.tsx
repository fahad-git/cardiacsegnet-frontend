import colors from "@/theme/Colors";
import { Box } from "@mui/material";
import React from "react";

export function navbar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 65,
        bgcolor: colors.green,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
    <p>  CardiacSegNet </p>  
    </Box>
  );
} 

export default navbar;
