"use client";
import Konva from "konva";
import Comments from "../Comments/Comments";
import Skeleton from "@mui/material/Skeleton";
import Rectangle from "../Rectangle/Rectangle";
import BrushIcon from "@mui/icons-material/Brush";
import { KonvaEventObject } from "konva/lib/Node";
import LayersStack from "../LayersStack/LayersStack";
import { Canvas, Container, ToolMenu, getErasorCursor } from "./Styles";
import { LineShape, RectabgleShape } from "@/utils/types";
import RectangleIcon from "@mui/icons-material/Rectangle";
import React, { useState, useRef, useEffect } from "react";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { Stage, Layer, Line, Rect, StageProps } from "react-konva";
import {
  Box,
  Button,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

// const imageUrl =
//   "https://i0.wp.com/www.asktheradtech.com/wp-content/uploads/2020/04/7e6e9eb3b2da5092972fc27c.jpg?resize=629%2C593";

const imageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/d/d0/Medical_X-Ray_imaging_ALP02_nevit.jpg";

function ImageEditor() {
  const [penSize, setPenSize] = useState(5);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [tool, setTool] = useState<string | null>(null);
  const [lines, setLines] = useState<Array<LineShape>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(0);
  const [stageHeight, setStageHeight] = useState(0);
  const isDrawing = useRef(false);
  const [rectangles, setRectangles] = useState<RectabgleShape[]>([]);
  const [selectedId, setSelectId] = useState<string | null>(null);
  const [imageScale, setImageScale] = useState(1);
  const [currentColor, setCurrentColor] = useState("#e6104d");
  const offscreenCanvasRef = useRef<HTMLDivElement | null>(null);
  const eraserCursor = getErasorCursor(penSize);

  const checkDeselect = (e: React.SyntheticEvent) => {
    const target = e.target as StageProps;
    const clickedOnEmpty = e.target === target.getStage();
    if (clickedOnEmpty) {
      setSelectId(null);
    }
  };

  const changeColor = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (selectedId) {
      const updatedRectangles = rectangles.map((rect) =>
        rect.id === selectedId ? { ...rect, stroke: target.value } : rect
      );
      setRectangles(updatedRectangles);
    } else {
      setCurrentColor(target.value);
    }
  };

  const handleVisibility = (idx: number) => {
    const rects = rectangles.slice();
    rects[idx] = { ...rects[idx], isVisible: !rects[idx].isVisible };
    setRectangles(rects);
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    const target = e.target;
    if (tool === "pen" || tool === "eraser") {
      isDrawing.current = true;
      const pos = target?.getStage()?.getPointerPosition();
      if (pos)
        setLines([
          ...lines,
          {
            tool,
            points: [pos.x, pos.y],
            strokeWidth: penSize,
            color: currentColor,
          },
        ]);
    }
  };

  const handleMouseMove = (e: React.SyntheticEvent) => {
    const target = e.target as StageProps;
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = (e: React.SyntheticEvent) => {
    if (tool !== "pen" && tool !== "eraser") checkDeselect(e);
    else isDrawing.current = false;
  };

  const handleToolChange = (
    e: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue === "color") return;
    if (newValue === "rectangle") {
      setRectangles([
        ...rectangles,
        {
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          stroke: currentColor,
          id: "rect" + rectangles.length + 1,
          isVisible: true,
        },
      ]);
    }
    if (newValue === tool || newValue === "rectangle") {
      setTool(null);
    } else {
      setSelectId(null);
      setTool(newValue);
    }
  };

  const handleSave = () => {
    if (image) {
      const originalWidth = image.naturalWidth;
      const originalHeight = image.naturalHeight;

      if (!offscreenCanvasRef.current) {
        offscreenCanvasRef.current = document.createElement("div");
        offscreenCanvasRef.current.style.width = originalWidth.toString();
        offscreenCanvasRef.current.style.height = originalHeight.toString();
      }

      const tempStage = new Konva.Stage({
        width: originalWidth,
        height: originalHeight,
        container: offscreenCanvasRef.current!, // This container doesn't actually exist in the DOM
      });

      const imageLayer = new Konva.Layer();
      const konvaImage = new Konva.Image({
        x: 0,
        y: 0,
        image: image,
        width: originalWidth,
        height: originalHeight,
      });
      imageLayer.add(konvaImage);
      tempStage.add(imageLayer);

      const shapesLayer = new Konva.Layer();

      // Redraw rectangles
      rectangles.forEach((rect) => {
        const rectShape = new Konva.Rect({
          x: rect.x / imageScale,
          y: rect.y / imageScale,
          width: rect.width / imageScale,
          height: rect.height / imageScale,
          stroke: rect.stroke,
          strokeWidth: 2.5 / imageScale,
          rotation: rect.rotation,
          opacity: 0.75,
        });
        if (rect.isVisible) shapesLayer.add(rectShape);
      });

      // Redraw lines (assuming each line is an array of {tool, points})
      lines.forEach((line) => {
        const lineShape = new Konva.Line({
          points: line.points.map((p) => p / imageScale),
          stroke: line.color,
          strokeWidth: line.strokeWidth / imageScale,
          tension: 0.5,
          lineCap: "round",
          lineJoin: "round",
          globalCompositeOperation:
            line.tool === "eraser" ? "destination-out" : "source-over",
          opacity: line.tool === "eraser" ? 1 : 0.65,
        });
        shapesLayer.add(lineShape);
      });

      tempStage.add(shapesLayer);

      const dataURL = tempStage.toDataURL();

      // Download the image
      downloadURI(dataURL, "savedImage.png");
    }
  };

  function downloadURI(uri: string, name: string) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    const img = new window.Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = imageUrl;
    img.onload = () => {
      setImage(img);
      const imgNaturalWidth = img.naturalWidth;
      const imgNaturalHeight = img.naturalHeight;
      const imgAspectRatio = (1.0 * imgNaturalWidth) / imgNaturalHeight;

      if (
        containerRef.current?.offsetHeight &&
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
        setLoaded(true);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === "Delete" || event.key === "Backspace") && selectedId) {
        const newRectangles = rectangles.filter(
          (rect) => rect.id !== selectedId
        );
        setRectangles(newRectangles);
        setSelectId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId, rectangles]);

  return (
    <Container>
      <Canvas ref={containerRef} height={stageWidth} width={stageHeight}>
        {!loaded && (
          <Box sx={{ width: 300 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        )}
        {loaded && (
          <Stage
            width={stageWidth}
            height={stageHeight}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={(e: React.SyntheticEvent) => handleMouseUp(e)}
            style={{
              cursor:
                tool === "pen"
                  ? "crosshair"
                  : tool === "eraser"
                  ? eraserCursor
                  : "default",
            }}
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
                  stroke={line.color}
                  strokeWidth={line.strokeWidth}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  opacity={line.tool === "eraser" ? 1 : 0.65}
                  globalCompositeOperation={
                    line.tool === "eraser" ? "destination-out" : "source-over"
                  }
                />
              ))}
            </Layer>
            <Layer>
              {rectangles.map((rect, i) => {
                if (!rect.isVisible) return "";
                return (
                  <Rectangle
                    key={i}
                    shapeProps={{ ...rect, opacity: 0.75, strokeWidth: 2.5 }}
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
          aria-label="text alignment"
          size="large"
        >
          <ToggleButton
            color="primary"
            value="pen"
            aria-label="pen tool"
            onClick={(e) => handleToolChange(e, "pen")}
          >
            <BrushIcon />
          </ToggleButton>
          <ToggleButton
            color="primary"
            value="eraser"
            aria-label="eraser tool"
            onClick={(e) => handleToolChange(e, "eraser")}
          >
            <AutoFixHighIcon />
          </ToggleButton>
          <ToggleButton
            value="rectangle"
            aria-label="rectangle tool"
            onClick={(e) => handleToolChange(e, "rectangle")}
          >
            <RectangleIcon />
          </ToggleButton>
          <ToggleButton
            value="color"
            aria-label="color picker"
            onClick={(e) => handleToolChange(e, "color")}
          >
            <input
              type="color"
              value={
                selectedId
                  ? rectangles.find((r) => r.id === selectedId)?.stroke
                  : currentColor
              }
              onChange={changeColor}
            />
          </ToggleButton>
        </ToggleButtonGroup>
        {(tool === "pen" || tool === "eraser") && (
          <Slider
            value={penSize}
            onChange={(e, newValue) =>
              setPenSize(Array.isArray(newValue) ? newValue[0] : newValue)
            }
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={2}
            max={50}
          />
        )}
        <LayersStack
          rectangles={rectangles}
          handleVisibility={handleVisibility}
        />
        <Comments />
        <Button variant="contained" onClick={handleSave}>
          Export Image
        </Button>
      </ToolMenu>
    </Container>
  );
}

export default ImageEditor;
