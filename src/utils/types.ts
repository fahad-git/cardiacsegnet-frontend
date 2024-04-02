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
  url?: string;
  segUrl?: string;
  xaiUrl?: string;
  imageName?: string;
  imageExtention?: string;
  imageAnnotations?: {
    [key: string]: string;
  };
  comments?: string;
  reportUrl?: string;
}
