import { fabric } from 'fabric';
import { CANVAS_CONFIG } from '../config/canvas';
import { calculateImageScale } from './canvasUtils';

export const generateMask = (
  originalImage: string,
  maskCanvas: fabric.Canvas,
  callback: (compositeDataUrl: string) => void
) => {
  // Create temporary canvases
  const tempCanvas = document.createElement('canvas');
  const maskTempCanvas = document.createElement('canvas');
  tempCanvas.width = CANVAS_CONFIG.width;
  tempCanvas.height = CANVAS_CONFIG.height;
  maskTempCanvas.width = CANVAS_CONFIG.width;
  maskTempCanvas.height = CANVAS_CONFIG.height;
  
  const ctx = tempCanvas.getContext('2d')!;
  const maskCtx = maskTempCanvas.getContext('2d')!;

  // Draw the mask canvas content to our temporary canvas
  const maskDataUrl = maskCanvas.toDataURL('image/png');
  const maskImg = new Image();
  
  maskImg.onload = () => {
    // Draw mask to temporary canvas
    maskCtx.drawImage(maskImg, 0, 0);
    const maskImageData = maskCtx.getImageData(0, 0, CANVAS_CONFIG.width, CANVAS_CONFIG.height);

    // Load and draw the original image
    const img = new Image();
    img.onload = () => {
      const scale = calculateImageScale(
        { width: img.width, height: img.height },
        CANVAS_CONFIG
      );
      const left = (CANVAS_CONFIG.width - img.width * scale) / 2;
      const top = (CANVAS_CONFIG.height - img.height * scale) / 2;

      // Draw black background
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, CANVAS_CONFIG.width, CANVAS_CONFIG.height);

      // Draw the original image
      ctx.drawImage(
        img,
        left,
        top,
        img.width * scale,
        img.height * scale
      );

      // Get the composite image data
      const compositeData = ctx.getImageData(0, 0, CANVAS_CONFIG.width, CANVAS_CONFIG.height);

      // Apply mask
      for (let i = 0; i < compositeData.data.length; i += 4) {
        // If the mask pixel is black (R=0), make the result pixel black
        if (maskImageData.data[i] < 128) {
          compositeData.data[i] = 0;     // R
          compositeData.data[i + 1] = 0; // G
          compositeData.data[i + 2] = 0; // B
          compositeData.data[i + 3] = 255; // A
        }
      }

      // Put the composite data back
      ctx.putImageData(compositeData, 0, 0);
      callback(tempCanvas.toDataURL());
    };
    img.src = originalImage;
  };
  maskImg.src = maskDataUrl;
};