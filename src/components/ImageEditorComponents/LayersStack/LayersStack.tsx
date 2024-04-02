import React from "react";
import { Stack } from "@mui/material";
import { RectabgleShape } from "@/utils/types";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { RectangleColor } from "../Style";
import { IconContainer, Item, NameContainer, StackContainer } from "./Style";

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
