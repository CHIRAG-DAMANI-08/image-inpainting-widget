import React, { useRef, useState } from 'react';
import { BrushControls } from './BrushControls';
import { ImageUpload } from './ImageUpload';
import { CanvasProps } from '../types/canvas';
import { useCanvas } from '../hooks/useCanvas';
import { generateMask } from '../utils/maskGeneration';

export const Canvas: React.FC<CanvasProps> = ({ onMaskGenerated }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [brushSize, setBrushSize] = useState(20);
  const { fabricCanvas, originalImage, handleImageUpload } = useCanvas(canvasRef, brushSize);

  const handleGenerateMask = () => {
    if (fabricCanvas && originalImage) {
      const objects = fabricCanvas.getObjects();
      const referenceImage = objects.find(obj => obj.type === 'image');
      
      if (referenceImage) {
        fabricCanvas.remove(referenceImage);
        fabricCanvas.renderAll();
      }

      generateMask(originalImage, fabricCanvas, (compositeDataUrl) => {
        onMaskGenerated(compositeDataUrl, originalImage);
      });

      if (referenceImage) {
        fabricCanvas.add(referenceImage);
        fabricCanvas.renderAll();
      }
    }
  };

  const handleClear = () => {
    if (fabricCanvas && originalImage) {
      handleImageUpload({ target: { files: [new File([], originalImage)] } } as any);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <ImageUpload onImageUpload={handleImageUpload} />
        <BrushControls
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
        />
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
        >
          Clear
        </button>
        <button
          onClick={handleGenerateMask}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          disabled={!originalImage}
        >
          Generate Mask
        </button>
      </div>

      <canvas ref={canvasRef} className="border border-gray-300 rounded" />
    </div>
  );
};