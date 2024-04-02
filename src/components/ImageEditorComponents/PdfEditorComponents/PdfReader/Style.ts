import { Box, styled } from "@mui/material";

export const PdfContainer = styled(Box)(({ theme }) => ({
  marginTop: "10px",
  marginRight: "25px",
  marginLeft: "25px",
  borderTop: "0.5px solid",
  borderColor: theme.palette.common.grey,
  height: "100vh",
  overflowX: "hidden",
  "::-webkit-scrollbar": {
    display: "none",
  },
}));

export const Container = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100vh - 42px)",
  overflowX: "hidden",
}));
