import { MenuItem, Select, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { RectangleColor } from "../../Style";
import { Highlight, RectabgleShape } from "@/utils/types";
import { Container, PdfContainer } from "./Style";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfReaderProps {
  rectangles?: RectabgleShape[];
  addHighlights: (idx: number, word: string) => void;
  // lines?: LineShape[];
}

function PdfReader({ rectangles, addHighlights }: PdfReaderProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [, setLoading] = useState(false);
  const [pageWidth, setPageWidth] = useState(0);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const escapeRegExp = (text: string) => {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escapes special characters for RegExp
  };

  const textRenderer = useCallback(
    (textItem: any) => {
      const highlightPattern = (text: string, rectangles: RectabgleShape[]) => {
        let newText = text;
        const highlights: Highlight[] = [];
        rectangles.forEach((rectangle) => {
          rectangle.words?.forEach((w) =>
            highlights.push({
              word: w,
              color: rectangle.stroke,
            })
          );
        });
        highlights.forEach((highlight) => {
          const regex = new RegExp(escapeRegExp(highlight.word), "g");
          newText = newText.replace(
            regex,
            (value) =>
              `<mark style="background-color:${highlight.color};">${value}</mark>`
          );
        });
        return newText;
      };
      if (rectangles) return highlightPattern(textItem.str, rectangles);
      else return textItem.str;
    },
    [rectangles]
  );

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) => {
    setNumPages(nextNumPages);
  };

  const onPageLoadSuccess = () => {
    setPageWidth(window.innerWidth);
    setLoading(true);
  };

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };

  const onMouseUp = () => {
    const selection = window.getSelection();
    if (selection && !selection.rangeCount) return;

    const text = selection?.toString();
    if (text?.length && highlightIndex >= 0) {
      if (rectangles) addHighlights(highlightIndex, text);
    }
  };

  return (
    <Container>
      {rectangles?.length ? (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={highlightIndex}
          label="Color"
          autoWidth
        >
          {rectangles?.map((rect, i) => (
            <MenuItem
              key={rect.id}
              value={i}
              onClick={() => setHighlightIndex(i)}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Rectangle</Typography>
              <RectangleColor color={rect.stroke} />
            </MenuItem>
          ))}
        </Select>
      ) : (
        ""
      )}
      <PdfContainer>
        <Document
          onMouseUp={onMouseUp}
          file="https://pdfobject.com/pdf/sample.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          <Page
            key={`page_${numPages}`}
            pageNumber={1}
            renderAnnotationLayer={true}
            customTextRenderer={textRenderer}
            onLoadSuccess={onPageLoadSuccess}
            onRenderError={() => setLoading(false)}
            width={Math.max(pageWidth * 0.8, 390)}
          />
        </Document>
      </PdfContainer>
    </Container>
  );
}

export default PdfReader;
