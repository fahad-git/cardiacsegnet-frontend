export interface LineShape {
  tool: string;
  points: number[];
  strokeWidth: number;
  color: string;
  words?: string[];
}

export interface RectabgleShape {
  x: number;
  y: number;
  width: number;
  height: number;
  stroke: string;
  id: string;
  isVisible: boolean;
  rotation?: number;
  words: string[];
}

export interface Highlight {
  word: string;
  color: string;
}

export interface PushImageDetailResquestBody {
  id?: string;
  orgUrl?: string;
  segUrl?: string;
  xaiUrl?: string;
  orgDim1Url?: string;
  orgDim2Url?: string;
  orgDim3Url?: string;
  segDim1Url?: string;
  segDim2Url?: string;
  segDim3Url?: string;
  xaiDim1Url?: string;
  xaiDim2Url?: string;
  xaiDim3Url?: string;
  imageName?: string;
  imageExtention?: string;
  imageAnnotations?: {
    [key: string]: string;
  };
  comments?: string;
  reportUrl?: string;
}
