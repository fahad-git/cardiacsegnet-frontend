import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TopBarContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "42px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "10px",
  backgroundColor: theme.palette.common.vistaWhite,
}));
