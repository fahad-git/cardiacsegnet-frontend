export interface IImages {
  url: string;
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

  imageName: string;
  imageExtention: string;
  comments: string;
  imageAnnotations: object;
  id: string;
  uuid?: string;
  reportUrl: string;
}
