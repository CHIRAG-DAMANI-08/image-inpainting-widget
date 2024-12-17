import { fabric } from 'fabric';
import { CANVAS_CONFIG } from '../config/canvas';

export const initializeCanvas = (canvasElement: HTMLCanvasElement): fabric.Canvas => {
  const canvas = new fabric.Canvas(canvasElement, {
    isDrawingMode: true,
    width: CANVAS_CONFIG.width,
    height: CANVAS_CONFIG.height,
  });

  canvas.freeDrawingBrush.color = 'white';
  canvas.backgroundColor = 'black';
  canvas.renderAll();

  return canvas;
};