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
