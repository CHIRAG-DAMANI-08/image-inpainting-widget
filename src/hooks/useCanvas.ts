import { useEffect, useState, RefObject } from 'react';
import { fabric } from 'fabric';
import { initializeCanvas } from '../utils/canvasInit';
import { handleImageLoad } from '../utils/imageHandling';
import { CANVAS_CONFIG } from '../config/canvas';

export const useCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
  brushSize: number
) => {
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = initializeCanvas(canvasRef.current);
      canvas.freeDrawingBrush.width = brushSize;
      setFabricCanvas(canvas);

      return () => {
        canvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = brushSize;
    }
  }, [brushSize, fabricCanvas]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && fabricCanvas) {
      handleImageLoad(file, fabricCanvas, setOriginalImage);
    }
  };

  return {
    fabricCanvas,
    originalImage,
    handleImageUpload,
  };
};