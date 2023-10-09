import { Box, TextField } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const CommentEditor = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: "0px",
  color: theme.palette.common.white,
}));

function Comments() {
  return (
    <Box>
      <CommentEditor
        id="outlined-multiline-static"
        label="Comments"
        multiline
        rows={10}
        placeholder={"Add You comments here"}
      />
    </Box>
  );
}

export default Comments;
