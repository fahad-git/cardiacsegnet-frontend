import React from "react";
import { styled } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";

const CommentEditor = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: "0px",
  marginBottom: "10px",
  color: theme.palette.common.white,
}));

function Comments() {
  return (
    <Box>
      <CommentEditor
        id="outlined-multiline-static"
        multiline
        rows={10}
        placeholder={"Add You comments here"}
      />
    </Box>
  );
}

export default Comments;
