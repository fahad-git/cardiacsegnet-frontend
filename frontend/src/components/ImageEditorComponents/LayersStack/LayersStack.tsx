import { Box, Stack } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.vistaWhite,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "30px",
  paddingLeft: "10px",
  paddingRight: "10px",
}));

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

const IconContainer = styled(Box)(({ theme }) => ({
  borderLeft: "1px solid",
  borderLeftColor: theme.palette.common.isabelline,
  paddingLeft: "5px",
  paddingTop: "5px",
  cursor: "pointer",
}));

function LayersStack() {
  return (
    <StackContainer>
      <Stack spacing={1}>
        <Item>
          Reactangle 1
          <IconContainer>
            <RemoveRedEyeIcon />
          </IconContainer>
        </Item>
        <Item>
          Item 2
          <IconContainer>
            <VisibilityOffIcon />
          </IconContainer>
        </Item>
        {/* <Item>Item 3</Item>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item> */}
      </Stack>
    </StackContainer>
  );
}

export default LayersStack;
