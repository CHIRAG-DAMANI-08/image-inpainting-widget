import { fabric } from 'fabric';
import { CanvasSize, ImageDimensions } from '../types/canvas';

export const calculateImageScale = (
  image: ImageDimensions,
  canvas: CanvasSize
): number => {
  return Math.min(
    canvas.width / image.width,
    canvas.height / image.height
  );
};

export const positionImage = (
  img: fabric.Image,
  canvas: fabric.Canvas,
  scale: number
): void => {
  img.scale(scale);
  img.set({
    left: (canvas.width! - img.width! * scale) / 2,
    top: (canvas.height! - img.height! * scale) / 2,
    selectable: false,
    opacity: 0.5,
  });
};