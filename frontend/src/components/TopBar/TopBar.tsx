"use client";
import React from "react";
import { TopBarContainer } from "./Style";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

function TopBar() {
  const theme = useTheme();
  return (
    <TopBarContainer>
      <Typography
        sx={{
          marginLeft: "5px",
          ...theme.typography.body1,
          fontWeight: 900,
          color: theme.palette.common.black,
        }}
      >
        Medical Image Analytics
      </Typography>
    </TopBarContainer>
  );
}

export default TopBar;
