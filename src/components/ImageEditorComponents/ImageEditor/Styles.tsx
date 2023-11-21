import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  backgroundColor: theme.palette.common.vistaWhite,
  overflow: "hidden",
}));

export const DrawerContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
}));

export const DrawerButton = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "45px",
  height: "30px",
  borderRadius: "50px 0px 0px 50px",
  backgroundColor: theme.palette.common.isabelline,
  cursor: "pointer",
  transition: "box-shadow 0.3s ease, transform 0.3s ease",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  marginBottom: "10px",

  "&:hover": {
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.05)",
  },
}));

export const DrawerIcon = styled(ArrowBackIosNewIcon)(({ theme }) => ({
  color: theme.palette.common.grey,
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
