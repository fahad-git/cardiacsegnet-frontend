export interface LineShape {
  tool: string;
  points: number[];
  strokeWidth: number;
  color: string;
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
}
