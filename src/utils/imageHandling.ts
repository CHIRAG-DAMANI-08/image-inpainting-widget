import { fabric } from 'fabric';
import { calculateImageScale, positionImage } from './canvasUtils';
import { CANVAS_CONFIG } from '../config/canvas';

export const handleImageLoad = (
  file: File,
  fabricCanvas: fabric.Canvas,
  setOriginalImage: (url: string) => void
) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const imgUrl = e.target?.result as string;
    setOriginalImage(imgUrl);
    
    // Clear previous content
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = 'black';
    
    fabric.Image.fromURL(imgUrl, (img) => {
      const scale = calculateImageScale(
        { width: img.width!, height: img.height! },
        CANVAS_CONFIG
      );
      
      positionImage(img, fabricCanvas, scale);
      fabricCanvas.add(img);
      fabricCanvas.renderAll();
    });
  };
  reader.readAsDataURL(file);
};