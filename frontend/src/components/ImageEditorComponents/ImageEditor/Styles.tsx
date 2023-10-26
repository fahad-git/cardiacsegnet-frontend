import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  backgroundColor: theme.palette.common.vistaWhite,
  overflow: "hidden",
}));

export const Canvas = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100vh",
  padding: "6px",
  borderRadius: "15px 0 0 0",
  backgroundColor: theme.palette.common.white,
}));

export const ToolMenu = styled(Box)(({ theme }) => ({
  width: "400px",
  height: "100vh",
  padding: "6px",
  borderRadius: "0 15px 0 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderLeft: "1px solid",
  borderLeftColor: theme.palette.common.isabelline,
  backgroundColor: theme.palette.common.white,
}));

export const getErasorCursor = (size: number) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><circle cx='${
    size / 2
  }' cy='${size / 2}' r='${size / 2}' fill='%23ffffff' /></svg>") ${size / 2} ${
    size / 2
  }, auto`;
