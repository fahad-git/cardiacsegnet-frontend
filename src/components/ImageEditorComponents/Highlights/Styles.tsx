import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const Tag = styled(Chip)(({ col }: { col: string }) => ({
  backgroundColor: col,
  margin: "15px",
}));

export const TagsContainer = styled(Box)(({ theme }) => ({
  width: 300,
  border: `1px solid ${theme.palette.common.isabelline}`,
  padding: "5px",
  overflow: "scroll",
  maxHeight: "250px",
  marginBottom: "10px",
  "::-webkit-scrollbar": {
    display: "none",
  },
}));
