import React from "react";
import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { RectabgleShape } from "@/utils/types";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const StackContainer = styled(Box)(({ theme }) => ({
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

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.vistaWhite,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "30px",
  paddingLeft: "10px",
  paddingRight: "10px",
}));

const IconContainer = styled(Box)(({ theme }) => ({
  borderLeft: "1px solid",
  borderLeftColor: theme.palette.common.isabelline,
  paddingLeft: "5px",
  paddingTop: "5px",
  cursor: "pointer",
}));

const NameContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const RectangleColor = styled(Box)(({ color }: { color: string }) => ({
  width: "20px",
  height: "12px",
  backgroundColor: color,
  marginLeft: "10px",
}));

interface LayersStackProps {
  rectangles?: RectabgleShape[];
  handleVisibility: (idx: number) => void;
}

function LayersStack({ rectangles, handleVisibility }: LayersStackProps) {
  if (!rectangles) return <></>;
  return (
    <StackContainer>
      <Stack spacing={1}>
        {rectangles.map((rect, i) => (
          <Item key={rect.id}>
            <NameContainer>
              Rectangle
              <RectangleColor color={rect.stroke} />
            </NameContainer>
            <IconContainer onClick={() => handleVisibility(i)}>
              {rect.isVisible ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
            </IconContainer>
          </Item>
        ))}
      </Stack>
    </StackContainer>
  );
}

export default LayersStack;
