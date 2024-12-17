import { fabric } from 'fabric';
import { CanvasSize, ImageDimensions } from '../types/canvas';

export const CANVAS_CONFIG: CanvasSize = {
  width: 600,
  height: 400,
};

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

export const createMaskComposite = (
  originalImage: string,
  maskCanvas: fabric.Canvas,
  callback: (compositeDataUrl: string) => void
) => {
  // Create a temporary canvas for compositing
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = CANVAS_CONFIG.width;
  tempCanvas.height = CANVAS_CONFIG.height;
  const ctx = tempCanvas.getContext('2d')!;

  // Load the original image
  const img = new Image();
  img.onload = () => {
    // Calculate scaling and positioning
    const scale = calculateImageScale(
      { width: img.width, height: img.height },
      CANVAS_CONFIG
    );
    const left = (CANVAS_CONFIG.width - img.width * scale) / 2;
    const top = (CANVAS_CONFIG.height - img.height * scale) / 2;

    // Draw black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, CANVAS_CONFIG.width, CANVAS_CONFIG.height);

    // Get mask data
    const maskData = ctx.getImageData(0, 0, CANVAS_CONFIG.width, CANVAS_CONFIG.height);
    const maskImageData = new ImageData(
      new Uint8ClampedArray(maskCanvas.toDataURL('image/png')),
      CANVAS_CONFIG.width,
      CANVAS_CONFIG.height
    );

    // Draw the original image
    ctx.save();
    ctx.drawImage(
      img,
      left,
      top,
      img.width * scale,
      img.height * scale
    );

    // Apply the mask
    const compositeData = ctx.getImageData(0, 0, CANVAS_CONFIG.width, CANVAS_CONFIG.height);
    for (let i = 0; i < maskData.data.length; i += 4) {
      if (maskImageData.data[i] === 0) { // Black areas in mask
        compositeData.data[i] = 0;     // R
        compositeData.data[i + 1] = 0; // G
        compositeData.data[i + 2] = 0; // B
        compositeData.data[i + 3] = 255; // A
      }
    }
    ctx.putImageData(compositeData, 0, 0);

    // Return the composite image
    callback(tempCanvas.toDataURL());
  };
  img.src = originalImage;
};