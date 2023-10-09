"use client";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Stage, Layer, Line, Rect } from "react-konva";
import React, { useState, useRef, useEffect } from "react";
import BrushIcon from "@mui/icons-material/Brush";
import RectangleIcon from "@mui/icons-material/Rectangle";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Rectangle from "../Rectangle/Rectangle";
import { Canvas, Container, ToolMenu } from "./Styles";
import LayersStack from "../LayersStack/LayersStack";
import Comments from "../Comments/Comments";

// const imageUrl =
//   "https://i0.wp.com/www.asktheradtech.com/wp-content/uploads/2020/04/7e6e9eb3b2da5092972fc27c.jpg?resize=629%2C593";

const imageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/d/d0/Medical_X-Ray_imaging_ALP02_nevit.jpg";

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2",
  },
];

interface LineShape {
  tool: string;
  points: number[];
}

function ImageEditor() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tool, setTool] = useState<string | null>(null);
  const [lines, setLines] = useState<Array<LineShape>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(0);
  const [stageHeight, setStageHeight] = useState(0);
  const isDrawing = useRef(false);
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedId, setSelectId] = useState<string | null>(null);
  const [imageScale, setImageScale] = useState(1);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectId(null);
    }
  };

  const handleMouseDown = (e) => {
    if (tool === "pen" || tool === "eraser") {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = (e) => {
    if (tool !== "pen" && tool !== "eraser") checkDeselect(e);
    else isDrawing.current = false;
  };

  const handleToolChange = (
    e: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue === tool || newValue === "rectangle") {
      setTool(null);
    } else {
      setSelectId(null);
      setTool(newValue);
    }
  };

  useEffect(() => {
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      setImage(img);
      const imgNaturalWidth = parseFloat(img.naturalWidth);
      const imgNaturalHeight = parseFloat(img.naturalHeight);
      const imgAspectRatio = (1.0 * imgNaturalWidth) / imgNaturalHeight;

      console.log(imgNaturalWidth, imgNaturalHeight);
      console.log("Here");
      if (
        containerRef.current.offsetHeight &&
        containerRef.current?.offsetWidth
      ) {
        setImage(img);
        let width = 0;
        let height = 0;
        if (imgAspectRatio >= 1) {
          width = containerRef.current.offsetWidth;
          height = containerRef.current.offsetWidth / imgAspectRatio;

          // setDimensions({
          //   width: containerRef.current.offsetWidth,
          //   height: containerRef.current.offsetHeight / imgAspectRatio,
          // });
        } else {
          width = imgAspectRatio * containerRef.current.offsetHeight;
          height = containerRef.current.offsetHeight;

          // setDimensions({
          //   width: imgAspectRatio * containerRef.current.offsetHeight,
          //   height: containerRef.current.offsetHeight,
          // });
        }
        setStageWidth(width);
        setStageHeight(height);
        const scaleX = width / imgNaturalWidth;
        const scaleY = height / imgNaturalHeight;
        setImageScale(Math.max(scaleX, scaleY));
        setLoading(true);
      }
    };
  }, []);

  return (
    <Container>
      <Canvas ref={containerRef} height={stageWidth} width={stageHeight}>
        {loading && (
          <Stage
            width={stageWidth}
            height={stageHeight}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={(e) => handleMouseUp(e)}
            // onWheel={(e) => onWheel(e)}
            // scaleX={stageScale}
            // scaleY={stageScale}
            // x={stageX}
            // y={stageY}
          >
            <Layer>
              {image && (
                <Rect
                  x={0}
                  y={0}
                  width={stageWidth}
                  height={stageHeight}
                  listening={false}
                  fillPatternImage={image}
                  fillPatternScaleX={imageScale}
                  fillPatternScaleY={imageScale}
                />
              )}
            </Layer>
            <Layer>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke="#df4b26"
                  strokeWidth={5}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  opacity={0.65}
                  globalCompositeOperation={
                    line.tool === "eraser" ? "destination-out" : "source-over"
                  }
                />
              ))}
            </Layer>
            <Layer>
              {rectangles.map((rect, i) => {
                return (
                  <Rectangle
                    key={i}
                    shapeProps={{ ...rect, opacity: 0.65 }}
                    isSelected={rect.id === selectedId}
                    onSelect={() => {
                      if (!tool || tool === "rectangle") setSelectId(rect.id);
                    }}
                    onChange={(newAttrs) => {
                      const rects = rectangles.slice();
                      rects[i] = newAttrs;
                      setRectangles(rects);
                    }}
                  />
                );
              })}
            </Layer>
          </Stage>
        )}
      </Canvas>
      <ToolMenu>
        <ToggleButtonGroup
          value={tool}
          exclusive
          onChange={handleToolChange}
          aria-label="text alignment"
          size="large"
        >
          <ToggleButton color="primary" value="pen" aria-label="pen tool">
            <BrushIcon />
          </ToggleButton>
          <ToggleButton color="primary" value="eraser" aria-label="eraser tool">
            <AutoFixHighIcon />
          </ToggleButton>
          <ToggleButton value="rectangle" aria-label="rectangle tool">
            <RectangleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <LayersStack />
        <Comments />
      </ToolMenu>
    </Container>
  );
}

export default ImageEditor;
