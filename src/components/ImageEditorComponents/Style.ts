import { Box, styled } from "@mui/material";

export const RectangleColor = styled(Box)(({ color }: { color: string }) => ({
  width: "20px",
  height: "12px",
  backgroundColor: color,
  marginLeft: "10px",
}));
