import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StackContainer = styled(Box)(({ theme }) => ({
  marginTop: "10px",
  marginBottom: "10px",
  maxHeight: "250px",
  overflowX: "hidden",
  width: "100%",
  padding: "10px",
  backgroundColor: theme.palette.common.isabelline,
  borderRadius: "10px",
  "::-webkit-scrollbar": {
    display: "none",
  },
}));

export const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.vistaWhite,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "30px",
  paddingLeft: "10px",
  paddingRight: "10px",
}));

export const IconContainer = styled(Box)(({ theme }) => ({
  borderLeft: "1px solid",
  borderLeftColor: theme.palette.common.isabelline,
  paddingLeft: "5px",
  paddingTop: "5px",
  cursor: "pointer",
}));

export const NameContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
