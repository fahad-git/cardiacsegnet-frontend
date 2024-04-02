import React from "react";
import Stack from "@mui/material/Stack";
import { RectabgleShape } from "@/utils/types";
import { Tag, TagsContainer } from "./Styles";

interface HighlightskProps {
  rectangles?: RectabgleShape[];
  handleDelete: (idx: number, text: string) => void;
}

function Highlights({ rectangles, handleDelete }: HighlightskProps) {
  return (
    <TagsContainer>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {rectangles?.map((rect, idx) => (
          <>
            {rect.words.map((w, i) => (
              <Tag
                key={"word_" + i}
                label={w}
                onDelete={() => handleDelete(idx, w)}
                col={rect.stroke}
              />
            ))}
          </>
        ))}
      </Stack>
    </TagsContainer>
  );
}

export default Highlights;
