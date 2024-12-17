import { fabric } from 'fabric';

export interface CanvasProps {
  onMaskGenerated: (maskDataUrl: string, originalImageUrl: string) => void;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}